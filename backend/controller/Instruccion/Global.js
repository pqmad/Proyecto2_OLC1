const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const DecMetodo = require("./Declaracion_Metodo")
const Exec = require("./Exec_Llamada")
//const verificaparamaetros = require("./VerificarParametros");

function Global(_instrucciones, _ambito){
    var cadena = ""
//1ERA: VERIFICAR DE QUE SOLO VENGA 1 EXEC
    var contadorExec=0;
    for(let i=0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC){
            contadorExec++;
        }
    }
    if(contadorExec==0){
        return 'Error Semantico: No se ha detectado la sentencia EXEC'
    }
    else if(contadorExec>1){
        return 'Error Semantico: Se ha detectado '+contadorExec+' EXEC'
    }
//2DA: DECLARAR VARIABLES, METODOS Y ASIGNAR VALORES
    for(let i=0; i<_instrucciones.length; i++){

        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(_instrucciones[i], _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_M || _instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_F){
            var mensaje = DecMetodo(_instrucciones[i], _ambito)
            if(mensaje!=null){
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
                //console.log("mierdita")
                //console.log (instruccion)
                var mensaje = Exec(_instrucciones[i], _ambito)
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