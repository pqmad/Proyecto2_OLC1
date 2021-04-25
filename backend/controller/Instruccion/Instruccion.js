const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")

function nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna){
    return {
        opIzq: _opIzq,
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna
    }
}

const Instruccion = {
    nuevoPRINT: function(_expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna 
        }
    },
    
    nuevoVALOR:function(_valor, _tipo, _linea, _columna){
        return{
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaOperacionBinaria: function(_opIzq, _opDer, _tipo, _linea, _columna){
        return nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna)
    },

    nuevaDECLARACION: function(_id, _valor, _tipo, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    
    nuevaASIGNACION: function(_id, _expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoDOWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DO_WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoOperacionTernario: function(_expresion, _verdadero, _falso, _linea, _columna){
        return {
            tipo: TIPO_OPERACION.TERNARIO,
            expresion: _expresion,
            verdadero: _verdadero,
            falso: _falso,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoTernario: function(_expresion, _verdadero, _falso, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.TERNARIO,
            expresion: _expresion,
            verdadero: _verdadero,
            falso: _falso,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoIf: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            valor:false
        }
    },

    /*nuevoElse: function(_expresionLogica, _instruccionesIfVerdadero, _instruccionesIfFalso,_linea,_columna) {
        return {
            tipo: TIPO_INSTRUCCION.ELSE,
            expresionLogica: _expresionLogica,
			instruccionesIfVerdadero: _instruccionesIfVerdadero,
			instruccionesIfFalso: _instruccionesIfFalso,
            linea: _linea,
            columna: _columna
        }
    },*/
    

    nuevoFOR: function(_valorVariable, _expresionLogica, _aumento, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            expresionLogica: _expresionLogica,
			instrucciones: _instrucciones,
			aumento: _aumento,
			valorVariable: _valorVariable,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaMETODO: function(_nombre, _lista_parametros, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION_M,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaFUNCION: function(_tipo,_nombre, _lista_parametros, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION_F,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            devuelve: _tipo,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaPARAMETRO: function(_id,_tipo, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },

    Exec: function(_id,_parametros, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.EXEC,
            nombre: _id,
            lista_valores: _parametros,
            linea: _linea,
            columna: _columna
        }
    },

    Llamadas: function(_id,_parametros, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.LLAMADA,
            nombre: _id,
            lista_valores: _parametros,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoSwitch: function(expresion, casos, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH,
			expresion: expresion,
			casos: casos,
            linea: _linea,
            columna: _columna
		}
	},

	nuevoListaCasos: function (caso) {
		var casos = []; 
		casos.push(caso);
		return casos;
	},

    nuevoCaso: function(expresion, instrucciones, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH_CASO,
			expresion: expresion,
			instrucciones: instrucciones,
            linea: _linea,
            columna: _columna
		}
	},

    nuevoCasoDef: function(instrucciones, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH_DEFECTO,
			instrucciones: instrucciones,
            linea: _linea,
            columna: _columna
		}
	},

    nuevoCASTEO: function(_tipodedato, _valor, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.CASTEO,
			tipodedato:_tipodedato,
            valor:_valor,
            linea: _linea,
            columna: _columna
		}
	},

    nuevoELSEIF: function(expresion, instrucciones,casos, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.ELSEIF,
			expresion: expresion,
            instrucciones:instrucciones,
			casos: casos,
            linea: _linea,
            columna: _columna
		}
	},

	nuevoListaELSEIF: function (caso) {
		var casos = []; 
		casos.push(caso);
		return casos;
	},

    nuevoOP_ELSEIF: function(expresion, instrucciones, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.ELSEIF_OP,
			expresion: expresion,
			instrucciones: instrucciones,
            linea: _linea,
            columna: _columna
		}
	},

    nuevoELSEIF_Def: function(instrucciones, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.ELSEIF_ELSE,
			instrucciones: instrucciones,
            linea: _linea,
            columna: _columna
		}
	}
}

module.exports = Instruccion