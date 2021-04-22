const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function Sentencia_else(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresionLogica, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instruccionesIfVerdadero, nuevoAmbito)
            //actualizamos
            operacion = Operacion(_instruccion.expresionLogica, _ambito)
        } else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instruccionesIfFalso, nuevoAmbito)
            //actualizamos
            operacion = Operacion(_instruccion.expresionLogica, _ambito)
        }
        return mensaje
    }
    return `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Sentencia_else