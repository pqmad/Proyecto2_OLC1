const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultado(_tipo1, _tipo2, _operacion){
    //SUMA
    if( _operacion==="suma"){
        if((_tipo1 === TIPO_DATO.ENTERO || _tipo2 === TIPO_DATO.ENTERO) && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA && _tipo1!==TIPO_DATO.DECIMAL && _tipo2!==TIPO_DATO.DECIMAL) { return TIPO_DATO.ENTERO}
        else if ((_tipo1 === TIPO_DATO.CADENA || _tipo2 === TIPO_DATO.CADENA) && _tipo1!==null && _tipo2!==null) { return TIPO_DATO.CADENA}
        else if((_tipo1 === TIPO_DATO.DECIMAL || _tipo2 === TIPO_DATO.DECIMAL) && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA) { return TIPO_DATO.DECIMAL}
        else if(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CARACTER && _tipo1!==null && _tipo2!==null){ return TIPO_DATO.CADENA}
    }
    else if( _operacion==="resta" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA ){
        if(_tipo1 === TIPO_DATO.ENTERO || _tipo2 === TIPO_DATO.ENTERO && _tipo1!==TIPO_DATO.DECIMAL && _tipo2!==TIPO_DATO.DECIMAL) { return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL || _tipo2 === TIPO_DATO.DECIMAL) { return TIPO_DATO.DECIMAL}
    }
    else if( _operacion==="multi" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA){
        if(_tipo1 === TIPO_DATO.ENTERO || _tipo2 === TIPO_DATO.ENTERO && _tipo1!==TIPO_DATO.DECIMAL && _tipo2!==TIPO_DATO.DECIMAL) { return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL || _tipo2 === TIPO_DATO.DECIMAL) { return TIPO_DATO.DECIMAL}
    }
    else if( _operacion==="division" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA){
        { return TIPO_DATO.DECIMAL}
    }
    else if( _operacion==="modulo" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA && _tipo1!==TIPO_DATO.CARACTER && _tipo2!==TIPO_DATO.CARACTER){
        { return TIPO_DATO.DECIMAL}
    }
    else if( _operacion==="potencia" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA && _tipo1!==TIPO_DATO.CARACTER && _tipo2!==TIPO_DATO.CARACTER){
        if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO){ return TIPO_DATO.ENTERO}
        else { return TIPO_DATO.DECIMAL}
    }
    else if( _operacion==="negacion" && (_tipo1===TIPO_DATO.ENTERO ||_tipo1===TIPO_DATO.DECIMAL) ){
        if(_tipo1 === TIPO_DATO.ENTERO){ return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL){ return TIPO_DATO.DECIMAL}
    }
    return null
}

module.exports = TipoResultado