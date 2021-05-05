const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const DecMetodo = require("./Declaracion_Metodo")
const Exec = require("./Exec_Llamada")
//const verificaparamaetros = require("./VerificarParametros");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
const Asignacion_vector = require("./Asignacion_VEC");
const Asignacion_LISTA = require("./Asignacion_LISTA");

function Global(_instrucciones, _ambito,_Error,_entorno,Simbol){
    var cadena = ""
//1ERA: VERIFICAR DE QUE SOLO VENGA 1 EXEC
    var contadorExec=0;
    for(let i=0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC){
            contadorExec++;
        }
    }
    if(contadorExec==0){
        
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No se ha detectado la sentencia EXEC",_instrucciones.linea, _instrucciones.columna);
        _Error.addErrores(nuevo)
        return 'Error Semantico: No se ha detectado la sentencia EXEC'
    }
    else if(contadorExec>1){
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,'Se ha detectado '+contadorExec+' EXEC',_instrucciones.linea, _instrucciones.columna);
        _Error.addErrores(nuevo)
        return 'Error Semantico: Se ha detectado '+contadorExec+' EXEC'
    }
//2DA: DECLARAR VARIABLES, METODOS Y ASIGNAR VALORES
    for(let i=0; i<_instrucciones.length; i++){

        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(_instrucciones[i], _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                //var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,mensaje,_instrucciones.linea, _instrucciones.columna);
                //s_Error.addErrores(nuevo)
                cadena+=mensaje+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(_instrucciones[i], _ambito,_Error,Simbol)
            if(mensaje!=null){
                //var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,mensaje,_instrucciones.linea, _instrucciones.columna);
                //_Error.addErrores(nuevo)
                cadena+=mensaje+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.MODIFICAR_V || _instrucciones[i].tipo === TIPO_INSTRUCCION.MODIFICAR_L){
            var mensaje = Asignacion_vector(_instrucciones[i], _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                //var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,mensaje,_instrucciones.linea, _instrucciones.columna);
                //_Error.addErrores(nuevo)
                cadena+=mensaje+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.AGREGAR_VAL_LISTA){
            var mensaje = Asignacion_LISTA(_instrucciones[i], _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                //var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,mensaje,_instrucciones.linea, _instrucciones.columna);
                //_Error.addErrores(nuevo)
                cadena+=mensaje+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_M || _instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_F){
            var mensaje = DecMetodo(_instrucciones[i], _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                //var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,mensaje,_instrucciones.linea, _instrucciones.columna);
                //_Error.addErrores(nuevo)
                cadena+=mensaje+'\n'
            }
        }

    }
    //console.log(_ambito)
    for(let i=0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC){
           // var mensaje1=verificaparamaetros(_instrucciones[i].,instruccion.id,_instrucciones)
            //if(mensaje1!=null){
              //  cadena+=mensaje1+'\n'
            //}else{ //para que no ejecute el metoo o funcion hasta que se cumpla con los parametros correctos
               
                var mensaje = Exec(_instrucciones[i], _ambito,_Error,_entorno,Simbol).cadena
                if(mensaje!=null){
                    cadena+=mensaje
                }
            //}
            break


        }
    }
    //3ERA PASADA VAMOS A BUSCAR EL EXEC QUE VAMOS EJECUTAR
    return cadena
}

module.exports = Global