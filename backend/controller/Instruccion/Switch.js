const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");

function pSwitch(instruccion, _ambito) {
    var mensaje = ""
    var evaluar = true;
    const valorExpresion = Operacion(instruccion.expresion, _ambito);
    const nuevoAmbito = new Ambito(_ambito);
    instruccion.casos.forEach(caso => {
        const Bloque = require('./Bloque')
        if (caso.tipo == TIPO_INSTRUCCION.SWITCH_CASO){
            const valorExpCase= Operacion(caso.expresion, nuevoAmbito);
            console.log("CASO: ")
            console.log(valorExpCase.valor)
            console.log(valorExpresion.valor)
            if (valorExpCase.valor == valorExpresion.valor){
                mensaje+=Bloque(caso.instrucciones, nuevoAmbito);
                //console.log("CASO: "+mensaje)
                //evaluar = false;
            }
        }
        if (caso.tipo == TIPO_INSTRUCCION.SWITCH_DEFECTO){
            if (evaluar)
                mensaje+=Bloque(caso.instrucciones, nuevoAmbito);
                //console.log("CASO: "+mensaje)
        }
    });
    return mensaje
}
module.exports = pSwitch