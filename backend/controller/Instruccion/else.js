const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function Sentencia_else(_instruccion, _ambito,_Error,Simbol){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresionLogica, _ambito,_Error,"Else",Simbol)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instruccionesIfVerdadero, nuevoAmbito,_Error,"Else",Simbol)
            //actualizamos
            operacion = Operacion(_instruccion.expresionLogica, _ambito,_Error,"Else",Simbol)
        } else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instruccionesIfFalso, nuevoAmbito,_Error,"Else",Simbol)
            //actualizamos
            operacion = Operacion(_instruccion.expresionLogica, _ambito,_Error,"Else",Simbol)
        }
        return mensaje
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es una expresion de tipo BANDERA en la condicion",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
    return `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Sentencia_else