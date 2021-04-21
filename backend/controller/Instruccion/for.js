const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloFor(_instruccion, _ambito,_orig){
    var mensaje = ""
    var varible=_instruccion.valorVariable;
    var expresionlogica= _instruccion.expresionLogica;
    var aumento=_instruccion.aumento;
    console.log("varible")
    console.log(varible)
    console.log("expresionlogica")
    console.log(expresionlogica)
    console.log("aumento")
    console.log(aumento)
    const Bloque = require('./Bloque')
     varible=Bloque(_instruccion.valorVariable, _ambito,_orig);
     expresionlogica= Bloque(_instruccion.expresionLogica, _ambito,_orig);
     aumento=Bloque(_instruccion.aumento, _ambito,_orig);
     console.log("varible")
    console.log(varible)
    console.log("expresionlogica")
    console.log(expresionlogica)
    console.log("aumento")
    console.log(aumento)
    return mensaje
}

module.exports = CicloFor

/*const valor = procesarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos); //aqui quiero que retorne: tipo y valor
    tablaDeSimbolos.actualizar(instruccion.variable, valor);
    for (var i = tablaDeSimbolos.obtener(instruccion.variable); procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos);
        tablaDeSimbolos.actualizar(instruccion.variable, {valor: tablaDeSimbolos.obtener(instruccion.variable).valor + 1, tipo: TIPO_DATO.NUMERO})) {
        const tsPara = new TS(tablaDeSimbolos.simbolos);
        procesarBloque(instruccion.instrucciones, tsPara);
    }*/