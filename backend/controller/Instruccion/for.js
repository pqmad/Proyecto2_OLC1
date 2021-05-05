const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function CicloFor(_instruccion, _ambito,_Error,Simbol){
    var mensaje = ""
    var haybreak=false
    var hayreturn=false;
    var valorR=null;
    var nuevoAmbitodelfor = new Ambito(_ambito)
    if(_instruccion.valorVariable.tipo===TIPO_INSTRUCCION.DECLARACION){ //declara valor
        var mensajed = Declaracion(_instruccion.valorVariable, nuevoAmbitodelfor,_Error, "For",Simbol)
            if(mensajed!=null){
                mensaje+=mensajed+'\n'
            }
    }else{ //asigna valor
        var mensajed = Asignacion(_instruccion.valorVariable, nuevoAmbitodelfor,_Error,Simbol)
            if(mensajed!=null){
                mensaje+=mensajed+'\n'
            }
    }
    var operacion = Operacion(_instruccion.expresionLogica, nuevoAmbitodelfor,_Error, "For",Simbol)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(nuevoAmbitodelfor)
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito,_Error, "For",Simbol)
            mensaje+=ejec.cadena
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(ejec.haybreak || hayreturn || ejec.haycontinue){
                return {
                    cadena: mensaje,
                    hayreturn: hayreturn,
                    retorno:valorR
                }
            }
            //actualizamos
            Asignacion(_instruccion.aumento, nuevoAmbito,_Error)
            operacion = Operacion(_instruccion.expresionLogica, nuevoAmbitodelfor,_Error, "For",Simbol)
            
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

module.exports = CicloFor

/*const valor = procesarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos); //aqui quiero que retorne: tipo y valor
    tablaDeSimbolos.actualizar(instruccion.variable, valor);
    for (var i = tablaDeSimbolos.obtener(instruccion.variable); procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos);
        tablaDeSimbolos.actualizar(instruccion.variable, {valor: tablaDeSimbolos.obtener(instruccion.variable).valor + 1, tipo: TIPO_DATO.NUMERO})) {
        const tsPara = new TS(tablaDeSimbolos.simbolos);
        procesarBloque(instruccion.instrucciones, tsPara);
    }*/