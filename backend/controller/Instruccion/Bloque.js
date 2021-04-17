const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Print");
const metfun = require("./Metodo_Funcion");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./while");
const verificaparamaetros = require("./VerificarParametros");

function Bloque(_instrucciones, _ambito,original){
    var cadena = ""
//    console.log(_instrucciones)
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
        else if(instruccion.tipo === TIPO_INSTRUCCION.EXEC || instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            //console.log("entrando");
            var mensaje1=verificaparamaetros(instruccion.parametros,instruccion.id,_instrucciones)
            //console.log("**entrando**");
            if(mensaje1!=null){
                cadena+=mensaje1+'\n'
            }
            //console.log("mierdita")
            //console.log (instruccion)
            var mensaje = metfun(instruccion.id, _ambito,_instrucciones,instruccion.parametros,original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
            
        }


    });
    return cadena
}

module.exports = Bloque