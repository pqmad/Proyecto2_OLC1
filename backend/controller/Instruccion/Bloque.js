const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Print");
const Declaracion = require("./Declaracion");

function Bloque(_instrucciones, _ambito){
    var cadena = ""

    _instrucciones.forEach(instruccion => {

        if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            cadena+=Cout(instruccion, _ambito)+'\n'
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

    });
    return cadena
}

module.exports = Bloque