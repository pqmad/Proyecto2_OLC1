const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")


function ternario(_instruccion, _ambito){
    console.log("-----------------entra al ternario de variables")
    console.log(_instruccion)
    const c=_instruccion.expresion
    const v=_instruccion.verdadero
    const f=_instruccion.falso
    const Operacion = require("../Operacion/Operacion")
    const condicion = Operacion(c, _ambito)
    const verdadero = Operacion(v, _ambito)
    const falso = Operacion(f, _ambito)
    
    if(condicion.tipo=== TIPO_DATO.BANDERA){
        var r_valor, r_tipo
        if(condicion.valor){
            r_valor = verdadero.valor
            r_tipo= verdadero.tipo
        }else{
            r_valor = falso.valor
            r_tipo= falso.tipo
        }
        return {
            valor: r_valor,
            tipo: r_tipo,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = ternario