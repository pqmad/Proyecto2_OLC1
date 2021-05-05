const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function pSwitch(instruccion, _ambito,_Error,Simbol) {
    var mensaje = ""
    var haybreak = false;
    var hayreturn=false;
    var valorR=null;
    var haycontinue=false;
    const valorExpresion = Operacion(instruccion.expresion, _ambito,_Error,"Switch-Case",Simbol);
    const nuevoAmbito = new Ambito(_ambito);
    instruccion.casos.forEach(caso => {
        const Bloque = require('./Bloque')
        if (caso.tipo == TIPO_INSTRUCCION.SWITCH_CASO){
            const valorExpCase= Operacion(caso.expresion, nuevoAmbito,_Error,"Switch-Case",Simbol);
            //console.log("CASO: ")
            //console.log(valorExpCase.valor)
            //console.log(valorExpresion.valor)
            if (valorExpCase.valor == valorExpresion.valor && !haybreak){
                var ejec=Bloque(caso.instrucciones, nuevoAmbito,_Error,"Switch-Case",Simbol);
                mensaje+=ejec.cadena
                haybreak=ejec.haybreak
                hayreturn=ejec.hayreturn
                valorR=ejec.retorno
                haycontinue=ejec.haycontinue
                //console.log("CASO: "+mensaje)
                //evaluar = false;
            }
        }
        else if (caso.tipo == TIPO_INSTRUCCION.SWITCH_DEFECTO){
            if (!haybreak){
                var ejec=Bloque(caso.instrucciones, nuevoAmbito,_Error,"Switch-Case",Simbol);
                mensaje+=ejec.cadena
                haybreak=ejec.haybreak
                hayreturn=ejec.hayreturn
                valorR=ejec.retorno
            }
                //console.log("CASO: "+mensaje)
        }
        if(hayreturn){
            return {
                cadena: mensaje,
                hayreturn: hayreturn,
                retorno:valorR
            }
        }
    });
    return {
        cadena: mensaje,
        hayreturn: hayreturn,
        retorno:valorR
    }
}
module.exports = pSwitch