const Operacion = require("../Operacion/Operacion");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const ERRORES = require("../Ambito/S_Error")

function Asignacion_LISTA(_instruccion, _ambito,_Error,_entorno,Simbol){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor = Operacion(_instruccion.valor, _ambito,_Error,"",Simbol)
        var simbolo = _ambito.getSimbolo(id)
        var valores=simbolo.valor
        //console.log(valores)
        valores.push(valor)

        var tipos = {
            tipoSimbolo: simbolo.extra,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            //console.log(valores)
            simbolo.valor = valores
            _ambito.actualizar(id,simbolo)
            return null
        }
        
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`No es posible asignar un valor de tipo ${tipos.tipoNuevoValor} a la lista  ${id}  que es de tipo ${tipos.tipoSimbolo}.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)
        return valor.valor+" Error Semantico: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la lista '"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La lista '${String(id)}' no existe.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)
    return `Error Semantico: La lista '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`

}


module.exports = Asignacion_LISTA