const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Print");
const metfun = require("./Metodo_Funcion");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./while");
const Sentencia_if = require("./if");
const Sentencia_else = require("./else");
const sentencia_elseif = require("./else");
const Ciclofor = require("./for");
const verificaparamaetros = require("./VerificarParametros");

function Bloque(_instrucciones, _ambito,original){
    var cadena = ""
    console.log(_instrucciones)
    /*console.log(_instrucciones[0])
    console.log("******************************************************")
    console.log(_instrucciones[1])
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(_instrucciones[2])*/
    _instrucciones.forEach(instruccion => {
        //console.log("valuando..."+instruccion.tipo)
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            cadena+=Cout(instruccion, _ambito)+'\n'
        }
        
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = CicloWhile(instruccion, _ambito,original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var mensaje = Sentencia_if(instruccion, _ambito,original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSE){
            var mensaje = Sentencia_else(instruccion, _ambito,original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        /*FALTAAAAAAAAAA
        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF){
            var mensaje = sentencia_elseif(instruccion, _ambito,original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }*/

        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var mensaje = Ciclofor(instruccion, _ambito, original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.EXEC || instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            var mensaje1=verificaparamaetros(instruccion.parametros,instruccion.id,_instrucciones)
            if(mensaje1!=null){
                cadena+=mensaje1+'\n'
            }else{ //para que no ejecute el metoo o funcion hasta que se cumpla con los parametros correctos
                //console.log("mierdita")
                //console.log (instruccion)
                var mensaje = metfun(instruccion.id, _ambito,_instrucciones,instruccion.parametros,original)
                if(mensaje!=null){
                    cadena+=mensaje+'\n'
                }
            }
        }
    });
    return cadena
}

module.exports = Bloque