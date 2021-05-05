const procesarCadena = require("../Operacion/procesarCadena")

function Print(_instruccion, _ambito,_Error,Simbol){
    const cadena = procesarCadena(_instruccion.expresion, _ambito,_Error,"Print",Simbol)
    return cadena
}

module.exports = Print