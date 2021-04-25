const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const TIPO_VALOR= require("../Enums/TipoValor")
const Simbolo = require("../Ambito/Simbolo");

function Exec_Llamada(_instruccion, _ambito){
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    /*console.log("------------------------------------------------------EXEC")
    console.log(metodoEjecutar)
    console.log("------------------------------------------------------lista de envio desde la llamada")
    console.log(_instruccion.lista_valores) // de la llamada
    console.log("------------------------------------------------------2lista de envio desde la llamada")
    console.log(metodoEjecutar.lista_parametros) //del metodo*/
    //----------------------------------------------------------
    
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
                }else{
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
                    if(tipo_mandar===tipo_recibe){
                        const nuevoSimbolo = new Simbolo(variable, valor_mandar, tipo_recibe, _instruccion.linea, _instruccion.columna)
                        nuevoAmbito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                        //console.log("Añadido: "+nuevoSimbolo.id)
                    }else{
                        return "Error Semantico: no coinciden los parametros enviado con los del metodo/funcion... linea: "+_instruccion.linea+" Columna: "+_instruccion.columna
                    }
                }
            }
        }else{
            return "Error Semantico: no coinciden los parametros enviado con los del metodo/funcion... linea: "+_instruccion.linea+" Columna: "+_instruccion.columna
        }
        return Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
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