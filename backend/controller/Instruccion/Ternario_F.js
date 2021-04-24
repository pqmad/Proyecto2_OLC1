const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function Ternario_F(_instruccion, _ambito){
    console.log(_instruccion)
    const c=_instruccion.expresion
    const v=_instruccion.verdadero
    const f=_instruccion.falso
    const condicion = Operacion(c, _ambito)
    var mensaje=""
    if(condicion.tipo=== TIPO_DATO.BANDERA){
        const Bloque = require('./Bloque')
        if(condicion.valor){
            mensaje+=Bloque(v, _ambito)
        }else{
            mensaje+=Bloque(f, _ambito)
        }
        return mensaje
    }
    return `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Ternario_F