const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const TIPO_VALOR= require("../Enums/TipoValor")
const Simbolo = require("../Ambito/Simbolo");
const Operacion = require("../Operacion/Operacion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")

function Exec_Llamada(_instruccion, _ambito,_Error,_entorno,Simbol){
    var hayreturn=false;
    var valorR=null;
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    if(metodoEjecutar!=null){
        var nuevoAmbito = new Ambito(_ambito)
        let parametrosdemetodo_tipo=[]
        let parametrosdemetodo_variable=[]
        let valoresquemandan_tipo =[]
        let valoresquemandan_valor =[]
        if(_instruccion.lista_valores!=null){
            
            var valor,tipo;
            _instruccion.lista_valores.forEach(e => {
                if(e.tipo === TIPO_VALOR.IDENTIFICADOR){
                    var param=_ambito.getSimbolo(e.valor);
                    tipo=param.tipo;
                    valor=param.valor;
                }else 
                if(e.tipo !== TIPO_VALOR.CADENA && e.tipo !== TIPO_VALOR.CARACTER &&
                    e.tipo !== TIPO_VALOR.ENTERO && e.tipo !== TIPO_VALOR.DECIMAL &&
                    e.tipo !== TIPO_VALOR.BANDERA){
                        //console.log(e)
                        var param =Operacion(e, _ambito,_Error,_entorno,Simbol)
                        tipo=param.tipo;
                        valor=param.valor;
                }
                else{
                    tipo=e.tipo;
                    valor=e.valor;
                }
                valoresquemandan_tipo.push(tipo)
                valoresquemandan_valor.push(valor)
                /*console.log("valores que lleva. tipo:"+tipo+" valor:"+valor)
                console.log(valoresquemandan_tipo)
                console.log(valoresquemandan_valor)
                console.log("+++++++++++++++++++++")*/

            });
        }
        if(_instruccion.lista_valores!=null){
            metodoEjecutar.lista_parametros.forEach(e => {
                parametrosdemetodo_tipo.push(e.tipo_dato)
                parametrosdemetodo_variable.push(e.id)
                /*console.log("valores de metodo. ")
                console.log(parametrosdemetodo_tipo)
                console.log(parametrosdemetodo_variable)
                console.log("+++++++++++++++++++++")*/
            });
        }
        
        if(parametrosdemetodo_tipo.length===valoresquemandan_tipo.length){
            if(valoresquemandan_tipo.length>0){
                for (let i = 0; i < parametrosdemetodo_tipo.length; i++) {
                    var tipo_mandar=valoresquemandan_tipo[i]
                    var tipo_recibe=parametrosdemetodo_tipo[i]
                    var valor_mandar=valoresquemandan_valor[i]
                    var variable=parametrosdemetodo_variable[i]
                    //console.log(tipo_mandar+"<-->"+tipo_recibe)
                    if(tipo_mandar===tipo_recibe){
                        const nuevoSimbolo = new Simbolo(variable, valor_mandar, tipo_recibe, "Parametros de "+metodoEjecutar.id,_instruccion.linea, _instruccion.columna)
                        nuevoAmbito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                        Simbol.add_s(nuevoSimbolo)
                        //console.log("Añadido: "+nuevoSimbolo.id)
                    }else{
                        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No coinciden los parametros enviado con los del metodo/funcion.",_instruccion.linea, _instruccion.columna);
                            _Error.addErrores(nuevo)
                            return {
                                cadena: "Error Semantico: no coinciden los parametros enviado con los del metodo/funcion... linea: "+_instruccion.linea+" Columna: "+_instruccion.columna,
                                hayreturn: hayreturn,
                                retorno:valorR
                            }
                    }
                }
            }
        }else{
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No coinciden los parametros enviado con los del metodo/funcion.",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return {
                    cadena: "Error Semantico: no coinciden los parametros enviado con los del metodo/funcion... linea: "+_instruccion.linea+" Columna: "+_instruccion.columna,
                    hayreturn: hayreturn,
                    retorno:valorR
                }
            
        }
        var ejec= Bloque(metodoEjecutar.instrucciones, nuevoAmbito,_Error,metodoEjecutar.id,Simbol)
        //console.log(ejec)
        var mensaje=ejec.cadena
        if(ejec.haybreak){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"Se ha encontrado un break fuera de un ciclo",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
            mensaje+=`Error: Se ha encontrado un break fuera de un ciclo`
        }
        if(ejec.haycontinue){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"Se ha encontrado un continue fuera de un ciclo",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
            mensaje+=`Error: Se ha encontrado un continue fuera de un ciclo`
        }
        hayreturn=ejec.hayreturn
        valorR=ejec.retorno
        var op = valorR;
        if(metodoEjecutar.soy==="Metodo"){
            if(valorR!=null){
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"Un método solo puede retornar null",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return {
                    cadena: `Error: Un método solo puede retornar null`,
                    hayreturn: hayreturn,
                    retorno:valorR
                }
            }
        }else{
            //op = Operacion(valorR, nuevoAmbito,_Error,_entorno,Simbol)
            //console.log("exec_llamada: "+valorR)
            if(valorR===null){
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La función no devuelve nada... tiene que retornar un valor tipo: ${metodoEjecutar.tipo}`,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return {
                    cadena: `Error: La función no devuelve nada... tiene que retornar un valor tipo: ${metodoEjecutar.tipo}`,
                    hayreturn: hayreturn,
                    retorno:{ tipo: TIPO_VALOR.CADENA, valor: 'null', linea:_instruccion.linea, columna: _instruccion.columna }
                }
            }else
            if(valorR.tipo!=metodoEjecutar.tipo && valorR.tipo!=TIPO_VALOR.IDENTIFICADOR){
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`Una función de tipo: ${metodoEjecutar.tipo} no puede retornar un tipo ${valorR.tipo}`,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return {
                    cadena: `Error: Un función de tipo: ${metodoEjecutar.tipo} no puede retornar un tipo ${valorR.tipo}`,
                    hayreturn: hayreturn,
                    retorno:valorR
                }
            }
        }
        return {
            cadena: mensaje,
            hayreturn: hayreturn,
            retorno:valorR
        }
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"El método "+_instruccion.nombre+" no existe.",_instruccion.linea, _instruccion.columna);
    _Error.addErrores(nuevo)
    return {
        cadena: `Error Semantico: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
        hayreturn: hayreturn,
        retorno:valorR
    } 
}

module.exports = Exec_Llamada

/*function Metodo_Funcion(miId, _ambito, _instruccion, _parametros,orig){
    var i=0;
    var mensaje = "";
    var encontrado=0;
    orig.forEach(instruccion => {
        //console.log("comparando..."+instruccion.id+"...con..."+miId)    
        if (instruccion.id!=miId && !encontrado && (instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_M || instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_F))
            i++
        else    
            encontrado=1;
    });
    var nuevoAmbito = new Ambito(_ambito);
    var para=null;
    if(_parametros!=null){
        if(_parametros.tipo === TIPO_VALOR.IDENTIFICADOR){
            var param=_ambito.getSimbolo(_parametros.valor);
            para=param.valor
        }else{
            para=_parametros.valor;
        }
    }
    if (orig[i].parametros!=null)
    orig[i].parametros.forEach(parametro => {
        
        const nuevoSimbolo = new Simbolo(parametro.id, para, _parametros.tipo, _instruccion.linea, _instruccion.columna)
        //console.log("nuevo simbolo--------------------->"+nuevoSimbolo.id+"<--->"+nuevoSimbolo.valor)
        nuevoAmbito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
    });
    const Bloque = require('./Bloque')
    //console.log("esta cosa..."+orig[i].instrucciones)
    mensaje+=Bloque(orig[i].instrucciones, nuevoAmbito,orig)
        return mensaje
    
    
}
module.exports = Metodo_Funcion*/