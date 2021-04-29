const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function elseif (instruccion, _ambito,_Error,Simbol) {
    mensaje=""
    const primerif = Operacion(instruccion.expresion, _ambito,_Error,"Else If / Else",Simbol);
    const nuevoAmbito = new Ambito(_ambito);
    //console.log(primerif.tipo+"----"+TIPO_DATO.BANDERA)
    if(primerif.tipo=== TIPO_DATO.BANDERA){
        if (primerif.valor){
            //console.log("primer valor true")
            const Bloque = require('./Bloque')
            mensaje= Bloque(instruccion.instrucciones, nuevoAmbito,_Error,"Else If / Else",Simbol);
        }else{
            instruccion.casos.forEach(caso => {
                const Bloque = require('./Bloque')
                if (caso.tipo === TIPO_INSTRUCCION.ELSEIF_OP){
                    const valorExpCase= Operacion(caso.expresion, nuevoAmbito,_Error,"Else If / Else",Simbol);
                    if(valorExpCase.tipo === TIPO_DATO.BANDERA){
                        if (valorExpCase.valor && mensaje===""){
                            //console.log("case true")
                            mensaje= Bloque(caso.instrucciones, nuevoAmbito,_Error,"Else If / Else",Simbol);
                        }
                    }else{
                        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es una expresion de tipo BANDERA en la condicion",valorExpCase.linea, valorExpCase.columna);
                        _Error.addErrores(nuevo)
                        mensaje= `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${valorExpCase.linea} Columna: ${valorExpCase.columna}`
                    }
                }
                if (caso.tipo === TIPO_INSTRUCCION.ELSEIF_ELSE){
                    if(mensaje===""){  
                        mensaje=Bloque(caso.instrucciones, nuevoAmbito,_Error,"Else If / Else");
                    }
                }
            });
        }
    }else{
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es una expresion de tipo BANDERA en la condicion",instruccion.linea, instruccion.columna);
                _Error.addErrores(nuevo)
        mensaje= `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${instruccion.linea} Columna: ${instruccion.columna}`
    } 
    return mensaje
    
}
module.exports = elseif