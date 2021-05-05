const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const ValorExpresion = require("./ValorExpresion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")

function FuncionesN(_expresion, _ambito,_Error, _entorno,Simbol){
    
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.ENTERO 
        || _expresion.tipo === TIPO_VALOR.BANDERA || _expresion.tipo === TIPO_VALOR.CARACTER
        || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        ){
        return ValorExpresion(_expresion, _ambito,_Error)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LENGTH){
        return f_length(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LOWER){
        return f_LOWER(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.UPPER){
        return f_UPPER(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TRUNCATE){
        return f_TRUNCATE(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.ROUND){
        return f_ROUND(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TYPEOF){
        return f_TYPEOF(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TOCHARARRAY){
        return f_TOCHARARRAY(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion, _ambito,_Error, _entorno,Simbol)
    }
}

function f_TYPEOF(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo!=null) {
        var resultado
        if (valor.tipo===TIPO_DATO.ENTERO){
            resultado="int"
        }else if (valor.tipo===TIPO_DATO.DECIMAL){
            resultado="double"
        }else if (valor.tipo===TIPO_DATO.CADENA){
            resultado="string"
        }else if (valor.tipo===TIPO_DATO.CARACTER){
            resultado="char"
        }else if (valor.tipo===TIPO_DATO.BANDERA){
            resultado="boolean"
        }else if (valor.tipo===TIPO_DATO.VECTOR){
            resultado="vector"
        }else if (valor.tipo===TIPO_DATO.LISTA){
            resultado="list"
        }
            return{
                valor: "\""+resultado+"\"",
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TYPEOF porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TYPEOF porque el tipo es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function f_ROUND(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo===TIPO_DATO.ENTERO || valor.tipo===TIPO_DATO.DECIMAL) {
        var resultado = Math.round(valor.valor);
            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función ROUND porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función ROUND porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function f_TRUNCATE(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo===TIPO_DATO.ENTERO || valor.tipo===TIPO_DATO.DECIMAL) {
        var resultado = Math.trunc(valor.valor);
            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TRUNCATE porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TRUNCATE porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function f_LOWER(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo===TIPO_DATO.CADENA) {
        var str=valor.valor;
            var resultado = str.toLowerCase();
            return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TO LOWER porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TO LOWER porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function f_UPPER(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo===TIPO_DATO.CADENA) {
        var str=valor.valor;
            var resultado = str.toUpperCase();
            return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función UPPER porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TO UPPER porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function f_length(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo===TIPO_DATO.CADENA || valor.tipo===TIPO_DATO.LISTA || valor.tipo===TIPO_DATO.VECTOR) {//falta agregar lista y vector
        var str=valor.valor;
            var resultado = str.length;
            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función LENGTH porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función LENGTH porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function f_TOCHARARRAY(_opIzq, _ambito,_Error, _entorno,Simbol){
    const valor = FuncionesN(_opIzq,_ambito,_Error, _entorno,Simbol)
    if(valor.tipo===TIPO_DATO.CADENA) {//falta agregar lista y vector
        var resultado = [];
        for (let i = 0; i < valor.valor.length; i++) {
            var inst = {
                tipo: TIPO_DATO.CARACTER,
                valor: valor.valor[i],
                linea: valor.linea,
                columna: valor.columna
            }
            resultado.push(inst)
        }
        
            return{
                valor: resultado,
                tipo: TIPO_DATO.LISTA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TO CHAR ARRAY porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TO CHAR ARRAY porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = FuncionesN