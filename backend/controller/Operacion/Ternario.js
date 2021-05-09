const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")

function ternario(_instruccion, _ambito,_Error, _entorno,Simbol){
    //console.log("-----------------entra al ternario de variables---->"+ _entorno)
    //console.log(_instruccion)
    const c=_instruccion.expresion
    const v=_instruccion.verdadero
    const f=_instruccion.falso
    const Operacion = require("../Operacion/Operacion")
    const condicion = Operacion(c, _ambito,_Error,"Ope. ternario",Simbol)
    //console.log(condicion)
    
    if(condicion.tipo=== TIPO_DATO.BANDERA){
        var r_valor, r_tipo
        if(condicion.valor){
            const verdadero = Operacion(v, _ambito,_Error,"Ope. ternario",Simbol)
            r_valor = verdadero.valor
            r_tipo= verdadero.tipo
        }else{
            const falso = Operacion(f, _ambito,_Error,"Ope. ternario",Simbol)
            r_valor = falso.valor
            r_tipo= falso.tipo
        }
        //console.log("RESPUESTA--------->"+r_valor)
        return {
            valor: r_valor,
            tipo: r_tipo,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    //var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,` La condición no es de tipo BANDERA, es: ${condicion.tipo}`,_instruccion.linea, _instruccion.columna);
    _Error.addErrores(nuevo)
    return{
        valor: `Error semántico: La condición no es de tipo BANDERA, es: ${condicion.tipo}... Linea: ${_instruccion.linea} Columna: ${_instruccion.linea}`,
        tipo: null,
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
}

module.exports = ternario