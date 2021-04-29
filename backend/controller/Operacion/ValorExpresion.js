const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")

function ValorExpresion(_expresion, _ambito,_Error){
    //console.log(_expresion.tipo+"<---->"+ _expresion.valor)
    if(_expresion.tipo === TIPO_VALOR.DECIMAL){
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.DECIMAL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.ENTERO){
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.ENTERO,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.BANDERA){
        return {
            valor: Boolean(_expresion.valor),
            tipo: TIPO_DATO.BANDERA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CADENA){
        var cadena = _expresion.valor
        /*.substring(1, _expresion.valor.length-1)
        cadena = cadena.replace(/\n/g, "\n");
        cadena = cadena.replace(/\\/g, "\\");
        cadena = cadena.replace(/\"/g, "\"");
        cadena = cadena.replace(/\t/g, "\t");
        cadena = cadena.replace(/\r/g, "\r");
        cadena = cadena.replace(/\'/g, "\'");*/
        return {
            valor: cadena,
            tipo: TIPO_DATO.CADENA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CARACTER){
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.CARACTER,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        const simbolo = _ambito.getSimbolo(_expresion.valor)

        if(simbolo!=null){
            var simboloo = simbolo.valor
            if(simbolo.valor[0]==="\"" || simbolo.valor[0]==="\'"){
                simboloo= simbolo.valor.substring(1, simbolo.valor.length-1)
            }
            return {
                valor: simboloo,
                tipo: simbolo.tipo,
                linea: simbolo.linea,
                columna: simbolo.columna
            }
        }
        var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"La variable '"+_expresion.valor+"' no existe",_expresion.linea, _expresion.columna);
        _Error.addErrores(nuevo)
        return {
            valor: "Error Semantico: la variable '"+_expresion.valor+"' no existe... Linea: "+_expresion.linea+" Columna: "+_expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }

    }

    //IDENTIFICADOR
}

module.exports = ValorExpresion