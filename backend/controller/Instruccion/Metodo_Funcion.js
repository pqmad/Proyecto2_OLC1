const Simbolo = require("../Ambito/Simbolo");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Operacion = require("../Operacion/Operacion");

function Metodo_Funcion(_instruccion, _ambito){
    if(_instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_M){
        const nuevoSimbolo = new Simbolo(_instruccion.id, _instruccion.expresion, TIPO_INSTRUCCION.DECLARACION_M, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)===true){
            return "Error: El metodo '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_F){
        const nuevoSimbolo = new Simbolo(_instruccion.id, null, TIPO_INSTRUCCION.DECLARACION_F, _instruccion.linea, _instruccion.columna)
        var valorretorno=_ambito.existeSimbolo(nuevoSimbolo.id)
        if (valorretorno===true){
            return "Error: El metodo '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
}
module.exports = Metodo_Funcion