const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
const Operacion = require("../Operacion/Operacion");
function AccesoVector(_instruccion, _ambito,_Error,_entorno,Simbol){
    var valor =null
    var valores=[]
    var posicion=Operacion(_instruccion.posicion, _ambito,_Error,_entorno,Simbol).valor
    var posi=Operacion(_instruccion.posicion, _ambito,_Error,_entorno,Simbol)
    //console.log( posicion)
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        //var valor = Operacion(_instruccion.expresion, _ambito,_Error,"",Simbol)
        var simbolo = _ambito.getSimbolo(id)
        valores=simbolo.valor
        var tam=valores.length;
        if(posicion<tam && posicion>=0){
            if(posi.tipo===TIPO_DATO.ENTERO){
                valor=valores[posicion];
                //console.log( "valor: "+valor)
                //const Operacion = require("./Operacion"); 
                valor = Operacion(valor, _ambito,_Error,_entorno,Simbol)
            }else{
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}`,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return{
                    valor: `Error Semantico: La posición ingresada: ${posicion} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                    tipo: TIPO_DATO.CADENA,
                    linea: _instruccion.linea,
                    columna: _instruccion.columna
                }
            }
            
        }else{
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} no cumple con la longitud del vector`,_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)
            return{
                valor: `Error Semantico: La posición ingresada: ${posicion} no cumple con la longitud del vector... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                tipo: TIPO_DATO.CADENA,
                linea: _instruccion.linea,
                columna: _instruccion.columna
            }
        }
        //console.log( valor.valor+"--->"+ valor.tipo)
        return{
            valor: valor.valor,
            tipo: valor.tipo,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`el vector '${String(id)}' no existe.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)
        return {
            valor: `Error Semantico: el vector '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
            tipo:TIPO_DATO.CADENA,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
}


module.exports = AccesoVector