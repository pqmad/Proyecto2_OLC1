const Operacion = require("../Operacion/Operacion");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function Asignacion(_instruccion, _ambito,_Error,Simbol){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor = Operacion(_instruccion.expresion, _ambito,_Error,"",Simbol)
        var simbolo = _ambito.getSimbolo(id)
        var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return null
        }
        if((tipos.tipoSimbolo===TIPO_DATO.DECIMAL && tipos.tipoNuevoValor===TIPO_DATO.ENTERO) ||
        (tipos.tipoSimbolo===TIPO_DATO.ENTERO && tipos.tipoNuevoValor===TIPO_DATO.DECIMAL) ||
        (tipos.tipoSimbolo===TIPO_DATO.CARACTER && tipos.tipoNuevoValor===TIPO_DATO.ENTERO) ||
        (tipos.tipoSimbolo===TIPO_DATO.CADENA && tipos.tipoNuevoValor===TIPO_DATO.CARACTER)
        ){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return null
        }
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`No es posible asignar un valor de tipo ${tipos.tipoNuevoValor} a la variable  ${id}  que es de tipo ${tipos.tipoSimbolo}.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)
        return valor.valor+" Error Semantico: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable \n'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`la variable '${String(id)}' no existe.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)
    return `Error Semantico: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Asignacion