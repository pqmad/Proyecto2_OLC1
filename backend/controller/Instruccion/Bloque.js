const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Print");
const metfun = require("./Metodo_Funcion");
const Declaracion = require("./Declaracion");
const Instruccion = require("./Instruccion");
function Bloque(_instrucciones, _ambito){
    var cadena = ""
    _instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_M || instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_F){
            var mensaje = metfun(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
            instruccion.expresion.forEach(element => {
                
                if(element.tipo === TIPO_INSTRUCCION.PRINT){
                    cadena+=Cout(element, _ambito)+'\n'
                }
        
                else if(element.tipo === TIPO_INSTRUCCION.DECLARACION){
                    var mensaje = Declaracion(element, _ambito)
                    if(mensaje!=null){
                        cadena+=mensaje+'\n'
                    }
                }
                
                else if(element.tipo === TIPO_INSTRUCCION.ASIGNACION){
                    var mensaje = Asignacion(element, _ambito)
                    if(mensaje!=null){
                        cadena+=mensaje+'\n'
                    }
                }
        
            });
            
        }

    });
    return cadena
}

module.exports = Bloque