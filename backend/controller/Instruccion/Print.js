const procesarCadena = require("../Operacion/procesarCadena")

function Print(_instruccion, _ambito,_Error,Simbol){
    const cadena = procesarCadena(_instruccion.expresion, _ambito,_Error,"Print",Simbol).valor
    return cadena
}

module.exports = Print