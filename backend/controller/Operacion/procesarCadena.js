const Operacion = require("./Operacion")

function procesarCadena(_expresion, _ambito,_Error){
    return Operacion(_expresion, _ambito,_Error)
}

module.exports = procesarCadena