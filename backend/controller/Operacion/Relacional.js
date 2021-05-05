const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")



function Relacional(_expresion, _ambito,_Error, _entorno,Simbol){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        || _expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.CARACTER
    ){
        return ValorExpresion(_expresion, _ambito,_Error)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||_expresion.tipo === TIPO_OPERACION.DIVISION ||_expresion.tipo === TIPO_OPERACION.MODULO || _expresion.tipo === TIPO_OPERACION.POTENCIA ||_expresion.tipo === TIPO_OPERACION.NEGACION
    ){
        return Aritmetica(_expresion, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion, _ambito,_Error, _entorno,Simbol)
    }
    //a+5<6*8
}

function igualigual(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Relacional(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Relacional(_opDer, _ambito,_Error, _entorno,Simbol)
    if(!((opIzq.tipo===TIPO_DATO.CADENA && opDer.tipo===TIPO_DATO.CARACTER) || (opDer.tipo===TIPO_DATO.CADENA && opIzq.tipo===TIPO_DATO.CARACTER))){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor == opDer.valor){
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
function diferente(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Relacional(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Relacional(_opDer, _ambito,_Error, _entorno,Simbol)
    if(!((opIzq.tipo===TIPO_DATO.CADENA && opDer.tipo===TIPO_DATO.CARACTER) || (opDer.tipo===TIPO_DATO.CADENA && opIzq.tipo===TIPO_DATO.CARACTER))){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor != opDer.valor){
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
function menor(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Relacional(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Relacional(_opDer, _ambito,_Error, _entorno,Simbol)
    if((opIzq.tipo===TIPO_DATO.ENTERO || opIzq.tipo===TIPO_DATO.DECIMAL || opIzq.tipo===TIPO_DATO.CARACTER) && (opDer.tipo===TIPO_DATO.ENTERO || opDer.tipo===TIPO_DATO.DECIMAL || opDer.tipo===TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor < opDer.valor){
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
function mayor(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Relacional(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Relacional(_opDer, _ambito,_Error, _entorno,Simbol)
    if((opIzq.tipo===TIPO_DATO.ENTERO || opIzq.tipo===TIPO_DATO.DECIMAL || opIzq.tipo===TIPO_DATO.CARACTER) && (opDer.tipo===TIPO_DATO.ENTERO || opDer.tipo===TIPO_DATO.DECIMAL || opDer.tipo===TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor > opDer.valor){
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
function menorigual(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Relacional(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Relacional(_opDer, _ambito,_Error, _entorno,Simbol)
    if((opIzq.tipo===TIPO_DATO.ENTERO || opIzq.tipo===TIPO_DATO.DECIMAL || opIzq.tipo===TIPO_DATO.CARACTER) && (opDer.tipo===TIPO_DATO.ENTERO || opDer.tipo===TIPO_DATO.DECIMAL || opDer.tipo===TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor <= opDer.valor){
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
function mayorigual(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Relacional(_opIzq, _ambito,_Error, _entorno,Simbol)
    const opDer = Relacional(_opDer, _ambito,_Error, _entorno,Simbol)
    if((opIzq.tipo===TIPO_DATO.ENTERO || opIzq.tipo===TIPO_DATO.DECIMAL || opIzq.tipo===TIPO_DATO.CARACTER) && (opDer.tipo===TIPO_DATO.ENTERO || opDer.tipo===TIPO_DATO.DECIMAL || opDer.tipo===TIPO_DATO.CARACTER)){ 
        var resultado = false
        if(opDer.valor <= opIzq.valor){
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
module.exports = Relacional