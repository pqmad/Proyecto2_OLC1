const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
const elseif = require("./else_if")
function casteo(_instruccion, _ambito,_Error,Simbol){
    var entro = false
    const cambiar_a=_instruccion.tipodedato;
    const evaluar=Operacion(_instruccion.valor,_ambito,_Error,"Casteo",Simbol)
    const valor_a_cambair=evaluar.valor;
    const tipo_a_cambair=evaluar.tipo;
    //console.log("entra a casteo"+valor_a_cambair)
    var val_final
    if (cambiar_a===TIPO_DATO.CARACTER && tipo_a_cambair===TIPO_DATO.ENTERO){
        val_final= String.fromCharCode(valor_a_cambair);
        entro=true
    }
    else if (cambiar_a===TIPO_DATO.ENTERO && tipo_a_cambair===TIPO_DATO.CARACTER){
        val_final= valor_a_cambair.charCodeAt(0);
        entro=true
    }
    else if (cambiar_a===TIPO_DATO.ENTERO && tipo_a_cambair===TIPO_DATO.DECIMAL){
        val_final= Math.trunc(valor_a_cambair);
        entro=true
    }
    else if (cambiar_a===TIPO_DATO.DECIMAL && tipo_a_cambair===TIPO_DATO.ENTERO){
        var volviendo=valor_a_cambair+".0";
        val_final= volviendo
        entro=true
    }
    else if (cambiar_a===TIPO_DATO.DECIMAL && tipo_a_cambair===TIPO_DATO.CARACTER){
        var volviendo=valor_a_cambair.charCodeAt(0)+".0";
        val_final= volviendo
        entro=true
    }
    else if (cambiar_a===TIPO_DATO.CADENA && (tipo_a_cambair===TIPO_DATO.BANDERA ||tipo_a_cambair===TIPO_DATO.CARACTER
        ||tipo_a_cambair===TIPO_DATO.DECIMAL ||tipo_a_cambair===TIPO_DATO.ENTERO)
        ){
        val_final= ""+valor_a_cambair;
        entro=true
    }
    else if(cambiar_a===tipo_a_cambair){
        val_final= valor_a_cambair;
        entro=true
    }
    if(entro){
        return{
            valor: val_final,
            tipo: cambiar_a,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`No se puede convertir un ${tipo_a_cambair} a un ${cambiar_a}.`,_instruccion.linea, _instruccion.columna);
    _Error.addErrores(nuevo)
    return{
        valor: `Error Semantico: No se puede convertir un ${tipo_a_cambair} a un ${cambiar_a}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
        tipo: tipo_a_cambair,
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
    /*var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return mensaje
    }*/
}

module.exports = casteo