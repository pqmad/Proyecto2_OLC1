class Metodo{
    constructor(_id, _lista_parametros, _instrucciones,_tipo, _linea, _columna){
        this.id = _id;
        this.lista_parametros = _lista_parametros;
        this.instrucciones = _instrucciones;
        this.tipo=_tipo;
        this.linea = _linea;
        this.columna = _columna;
    
    }
}

module.exports = Metodo