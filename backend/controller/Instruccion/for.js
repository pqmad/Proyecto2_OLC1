const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");

function CicloFor(_instruccion, _ambito){
    var mensaje = ""
    var nuevoAmbitodelfor = new Ambito(_ambito)
    console.log("empeiza el for aumento")
    if(_instruccion.valorVariable.tipo===TIPO_INSTRUCCION.DECLARACION){ //declara valor
        var mensajed = Declaracion(_instruccion.valorVariable, nuevoAmbitodelfor)
            if(mensajed!=null){
                mensaje+=mensajed+'\n'
            }
    }else{ //asigna valor
        var mensajed = Asignacion(_instruccion.valorVariable, nuevoAmbitodelfor)
            if(mensajed!=null){
                mensaje+=mensajed+'\n'
            }
    }
    var operacion = Operacion(_instruccion.expresionLogica, nuevoAmbitodelfor)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(nuevoAmbitodelfor)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            console.log("mensje bloque lgica.............")
            console.log(mensaje)
            //actualizamos
            Asignacion(_instruccion.aumento, nuevoAmbito)
            operacion = Operacion(_instruccion.expresionLogica, nuevoAmbitodelfor)
            console.log("operacion lgica.............")
            console.log(operacion)
        }
        return mensaje
    }
    return `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`

}

module.exports = CicloFor

/*const valor = procesarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos); //aqui quiero que retorne: tipo y valor
    tablaDeSimbolos.actualizar(instruccion.variable, valor);
    for (var i = tablaDeSimbolos.obtener(instruccion.variable); procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos);
        tablaDeSimbolos.actualizar(instruccion.variable, {valor: tablaDeSimbolos.obtener(instruccion.variable).valor + 1, tipo: TIPO_DATO.NUMERO})) {
        const tsPara = new TS(tablaDeSimbolos.simbolos);
        procesarBloque(instruccion.instrucciones, tsPara);
    }*/