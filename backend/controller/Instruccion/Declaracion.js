const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const casteo = require("./casteo");
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")
function Declaracion(_instruccion, _ambito,_Error){
    //console.log(_instruccion)
    if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        var valor = "0.0"
        if(_instruccion.valor != null  && _instruccion.valor.tipo!=TIPO_INSTRUCCION.CASTEO){
            var op = Operacion(_instruccion.valor, _ambito,_Error)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DECIMAL || tipo === TIPO_DATO.ENTERO ){
                valor = op.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }else
        if(_instruccion.valor!=null && _instruccion.valor.tipo===TIPO_INSTRUCCION.CASTEO){
            const val = casteo(_instruccion.valor, _ambito,_Error)
            tipo=val.tipo
            if(tipo === TIPO_DATO.DECIMAL){
                valor = val.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolodecla(nuevoSimbolo.id)!=false){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"La variable '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
            return "Error Semantico: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
        var valor = "" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null && _instruccion.valor.tipo!=TIPO_INSTRUCCION.CASTEO){
            op = Operacion(_instruccion.valor, _ambito,_Error)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.CADENA){
                valor = String(op.valor) //casteamos a cadena
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }else
        if(_instruccion.valor!=null && _instruccion.valor.tipo===TIPO_INSTRUCCION.CASTEO){
            const val = casteo(_instruccion.valor, _ambito,_Error)
            tipo=val.tipo
            if(tipo === TIPO_DATO.CADENA){
                valor = val.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolodecla(nuevoSimbolo.id)!=false){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"La variable '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)
            return "Error Semantico: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BANDERA){
        var valor = true // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito,_Error)
            tipo = op.tipo
            //verificamos que el valor a asignar sea del mismo tipo
            if(tipo===TIPO_DATO.BANDERA){
                valor = Boolean(op.valor)
            }
            else{
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return  "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BANDERA+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BANDERA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolodecla(nuevoSimbolo.id)!=false){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"La variable '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)
            return "Error Semantico: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.ENTERO){
        var valor = 0
        if(_instruccion.valor != null && _instruccion.valor.tipo!=TIPO_INSTRUCCION.CASTEO){
            var op = Operacion(_instruccion.valor, _ambito,_Error)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return   "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.ENTERO+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }else
        if(_instruccion.valor!=null && _instruccion.valor.tipo===TIPO_INSTRUCCION.CASTEO){
            const val = casteo(_instruccion.valor, _ambito,_Error)
            tipo=val.tipo
            if(tipo === TIPO_DATO.ENTERO){
                valor = val.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolodecla(nuevoSimbolo.id)!=false){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"La variable '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)
            return "Error Semantico: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CARACTER){ 
        var valor = "\u0000" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null && _instruccion.valor.tipo!=TIPO_INSTRUCCION.CASTEO){
            op = Operacion(_instruccion.valor, _ambito,_Error)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.CARACTER){
                valor = op.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return   "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }else
        if(_instruccion.valor!=null && _instruccion.valor.tipo===TIPO_INSTRUCCION.CASTEO){
            const val = casteo(_instruccion.valor, _ambito,_Error)
            tipo=val.tipo
            if(tipo === TIPO_DATO.CARACTER){
                valor = val.valor;
            }
            else {
                var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_dato,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)
                return "Error Semantico: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolodecla(nuevoSimbolo.id)!=false){
            var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"La variable '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)
            return "Error Semantico: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        console.log("llega aqui")
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }
}

module.exports = Declaracion