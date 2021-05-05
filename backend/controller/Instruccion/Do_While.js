const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function Do_While(_instruccion, _ambito,_Error,Simbol){
    var mensaje = ""
    var hayreturn=false;
    var valorR=null;
    var operacion = Operacion(_instruccion.expresion, _ambito,_Error,"Do While",Simbol)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        var contador=1;
        while(operacion.valor || contador===1){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec =Bloque(_instruccion.instrucciones, nuevoAmbito,_Error,"Do While",Simbol)
            mensaje+=ejec.cadena
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(ejec.haybreak || hayreturn){
                return {
                    cadena: mensaje,
                    hayreturn: hayreturn,
                    retorno:valorR
                }
            }
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito,_Error,"Do While",Simbol)
            contador++;
        }
        return {
            cadena: mensaje,
            hayreturn: hayreturn,
            retorno:valorR
        }
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es una expresion de tipo BANDERA en la condicion",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return {
                    cadena: `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                    hayreturn: hayreturn,
                    retorno:valorR
                } 
}

module.exports = Do_While