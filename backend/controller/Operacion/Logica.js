const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")

function Logica(_expresion, _ambito,_Error, _entorno,Simbol){
    //true || false
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        || _expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.CARACTER
    ){
        return ValorExpresion(_expresion, _ambito,_Error)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR){
        /*
        1 || 1 = 1
        1 || 0 = 1
        0 || 1 = 1
        0 || 0 = 0
        */
        return or(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.AND){
        /*
        1 && 1 = 1
        1 && 0 = 0
        0 && 1 = 0
        0 && 0 = 0
        */
        return and(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.NOT){
        /*
        1 && 1 = 1
        1 && 0 = 0
        0 && 1 = 0
        0 && 0 = 0
        */
        return not(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion, _ambito,_Error, _entorno,Simbol)
    }
}

function or(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Logica(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Logica(_opDer, _ambito,_Error, _entorno,Simbol)
    
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        if(opIzq.valor || opDer.valor){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function and(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Logica(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Logica(_opDer, _ambito,_Error, _entorno,Simbol)
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        if(opIzq.valor && opDer.valor){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function not(_opIzq, _ambito,_Error, _entorno,Simbol){
    const opIzq = Logica(_opIzq, _ambito,_Error, _entorno,Simbol)
    if(opIzq.tipo === TIPO_DATO.BANDERA){
        if(opIzq.valor === true){
            return {
                valor: false,
                tipo: TIPO_DATO.BANDERA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else {
            return {
                valor: true,
                tipo: TIPO_DATO.BANDERA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede invertir el  valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+ `\nError semántico: no se puede invertir el valor de tipo ${opIzq.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Logica