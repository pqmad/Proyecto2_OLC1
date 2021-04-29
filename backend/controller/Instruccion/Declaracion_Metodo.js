const Metodo = require("../Ambito/Metodo")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function DecMetodo(_instruccion, _ambito,_Error){
    var nuevoMetodo ;
    if (_instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_M){
        nuevoMetodo= new Metodo(_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones,null, _instruccion.linea, _instruccion.columna)
    }else{
        nuevoMetodo= new Metodo(_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones,_instruccion.devuelve, _instruccion.linea, _instruccion.columna)
    }
    //verificamos si el nombre ya existe como simbolo
    if(_ambito.existeSimbolo(nuevoMetodo.id)!=false){
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,` No se puede declarar un metodo con el mismo nombre de una variable '${nuevoMetodo.id}`,nuevoMetodo.linea, nuevoMetodo.columna);
    _Error.addErrores(nuevo)
        return `Error Semantico: No se puede declarar un metodo con el mismo nombre de una variable '${nuevoMetodo.id}'... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    //verificamos si el metodo ya existe
    else if(_ambito.existeMetodo(nuevoMetodo.id)!=false){
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`El método '${nuevoMetodo.id}' ya existe...`,nuevoMetodo.linea, nuevoMetodo.columna);
    _Error.addErrores(nuevo)
        return `Error Semantico: El método '${nuevoMetodo.id}' ya existe... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    //de lo contrario vamos a guardarlo
    _ambito.addMetodo(nuevoMetodo.id, nuevoMetodo)
    return null
}
module.exports = DecMetodo