class Metodo{
    constructor(_id, _lista_parametros,_entorno, _instrucciones,_tipo, _linea, _columna){
        this.id = _id;
        this.lista_parametros = _lista_parametros;
        this.entorno=_entorno,
        this.instrucciones = _instrucciones;
        this.tipo=_tipo;
        if(_tipo==="void"){
            this.soy="Metodo";
        }else{
            this.soy="Funcion";
        }
        this.linea = _linea;
        this.columna = _columna;
    
    }
}

module.exports = Metodo