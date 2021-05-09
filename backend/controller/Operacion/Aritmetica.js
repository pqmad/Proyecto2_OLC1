const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")


function Aritmetica(_expresion, _ambito,_Error, _entorno,Simbol){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        || _expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.CARACTER
    ){
        return ValorExpresion(_expresion, _ambito,_Error)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(_expresion.opIzq, _expresion.opDer, _ambito,_Error, _entorno,Simbol)
    }
    else if(_expresion.tipo === TIPO_OPERACION.NEGACION){
        return negacion(_expresion.opIzq, _ambito,_Error, _entorno,Simbol)
    }
    else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion, _ambito,_Error, _entorno,Simbol)
    }
}

function suma(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){ 
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const opDer = Aritmetica(_opDer,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo,"suma")
    //console.log(tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var val1=opIzq.valor; var val2=opDer.valor
            if(opIzq.tipo===TIPO_DATO.BANDERA){
                if(opIzq.valor){
                    val1=1;
                }else{
                    val1=0;
                }
            }
            if(opDer.tipo===TIPO_DATO.BANDERA){
                if(opDer.valor){
                    val2=1;
                }else{
                    val2=0;
                }
            }
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                val1=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                val2=opDer.valor.charCodeAt(0);
            }
            const resultado = Number(val1) + Number(val2);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.CADENA){
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion suma.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+' Error semántico: no se puede realizar la operacion suma...\nLinea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const opDer = Aritmetica(_opDer,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "resta")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var val1=opIzq.valor; var val2=opDer.valor
            if(opIzq.tipo===TIPO_DATO.BANDERA){
                if(opIzq.valor){
                    val1=1;
                }else{
                    val1=0;
                }
            }
            if(opDer.tipo===TIPO_DATO.BANDERA){
                if(opDer.valor){
                    val2=1;
                }else{
                    val2=0;
                }
            }
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                val1=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                val2=opDer.valor.charCodeAt(0);
            }
            const resultado = Number(val1) - Number(val2);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion resta.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion resta... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function multiplicacion(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const opDer = Aritmetica(_opDer,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "multi")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var val1=opIzq.valor; var val2=opDer.valor
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                val1=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                val2=opDer.valor.charCodeAt(0);
            }
            const resultado = Number(val1) * Number(val2);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion multiplicacion.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion multiplicacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function division(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const opDer = Aritmetica(_opDer,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "division")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var val1=opIzq.valor; var val2=opDer.valor
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                val1=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                val2=opDer.valor.charCodeAt(0);
            }
            const resultado = Number(val1) / Number(val2);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion division.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion division... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function potencia(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const opDer = Aritmetica(_opDer,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "potencia")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var resultado=Number(opIzq.valor);
            var i 
            for (i=1; i<opDer.valor; i++) {
                resultado = resultado * opIzq.valor;
            }
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion potencia.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion potencia... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function modulo(_opIzq, _opDer, _ambito,_Error, _entorno,Simbol){
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const opDer = Aritmetica(_opDer,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "modulo")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = Number(opIzq.valor) % Number(opDer.valor);
            return{
                valor: parseFloat(resultado),
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion modulo.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion modulo... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function negacion(_opIzq, _ambito,_Error, _entorno,Simbol){
    const opIzq = Aritmetica(_opIzq,_ambito,_Error, _entorno,Simbol)
    const tipoRes = TipoResultado(opIzq.tipo,opIzq.tipo, "negacion")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var resultado = -Number(opIzq.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"no se puede realizar la operacion negacion.",_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion negación... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Aritmetica