const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_DATO = require("../Enums/TipoDato")

function elseif (instruccion, _ambito) {
    mensaje=""
    const primerif = Operacion(instruccion.expresion, _ambito);
    const nuevoAmbito = new Ambito(_ambito);
    console.log(primerif.tipo+"----"+TIPO_DATO.BANDERA)
    if(primerif.tipo=== TIPO_DATO.BANDERA){
        if (primerif.valor){
            console.log("primer valor true")
            const Bloque = require('./Bloque')
            mensaje= Bloque(instruccion.instrucciones, nuevoAmbito);
        }else{
            instruccion.casos.forEach(caso => {
                const Bloque = require('./Bloque')
                if (caso.tipo === TIPO_INSTRUCCION.ELSEIF_OP){
                    const valorExpCase= Operacion(caso.expresion, nuevoAmbito);
                    if(valorExpCase.tipo === TIPO_DATO.BANDERA){
                        if (valorExpCase.valor && mensaje===""){
                            console.log("case true")
                            mensaje= Bloque(caso.instrucciones, nuevoAmbito);
                        }
                    }else{
                        mensaje= `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${valorExpCase.linea} Columna: ${valorExpCase.columna}`
                    }
                }
                if (caso.tipo === TIPO_INSTRUCCION.ELSEIF_ELSE){
                    if(mensaje===""){  
                        mensaje=Bloque(caso.instrucciones, nuevoAmbito);
                    }
                }
            });
        }
    }else{
        mensaje= `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${instruccion.linea} Columna: ${instruccion.columna}`
    } 
    return mensaje
    
}
module.exports = elseif