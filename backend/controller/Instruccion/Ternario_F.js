const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function Ternario_F(_instruccion, _ambito,_Error){
    console.log(_instruccion)
    const c=_instruccion.expresion
    const v=_instruccion.verdadero
    const f=_instruccion.falso
    const condicion = Operacion(c, _ambito,_Error)
    var mensaje=""
    if(condicion.tipo=== TIPO_DATO.BANDERA){
        const Bloque = require('./Bloque')
        if(condicion.valor){
            mensaje+=Bloque(v, _ambito,_Error)
        }else{
            mensaje+=Bloque(f, _ambito,_Error)
        }
        return mensaje
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es una expresion de tipo BANDERA en la condicion",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
    return `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Ternario_F