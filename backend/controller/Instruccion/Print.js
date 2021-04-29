const procesarCadena = require("../Operacion/procesarCadena")

function Print(_instruccion, _ambito,_Error){
    const cadena = procesarCadena(_instruccion.expresion, _ambito,_Error).valor
    return cadena
}

module.exports = Print