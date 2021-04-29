class Simbolo{
    constructor(_id, _valor, _tipo, _entorno,_linea, _columna){
        this.id = _id;
        this.valor = _valor;
        this.tipo = _tipo;
        this.entorno = _entorno;
        this.soy="Variable";
        this.linea = _linea;
        this.columna = _columna;
        this.extra="";
    }
}

module.exports = Simbolo