const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloWhile(_instruccion, _ambito,_orig){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito,_orig)
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloWhile