const Simbolo = require("../Ambito/Simbolo");
const TIPO_VALOR = require("../Enums/TipoValor");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Operacion = require("../Operacion/Operacion");
const Ambito = require("../Ambito/Ambito")

function Metodo_Funcion(miId, _ambito, _instruccion, _parametros,orig){
    var i=0;
    var mensaje = "";
    var encontrado=0;
    orig.forEach(instruccion => {
        //console.log("comparando..."+instruccion.id+"...con..."+miId)    
        if (instruccion.id!=miId && !encontrado && (instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_M || instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_F))
            i++
        else    
            encontrado=1;
    });
    var nuevoAmbito = new Ambito(_ambito);
    var para=null;
    if(_parametros.tipo === TIPO_VALOR.IDENTIFICADOR){
        var param=_ambito.getSimbolo(_parametros.valor);
        para=param.valor
    }else{
        para=_parametros.valor;
    }
    if (orig[i].parametros!=null)
    orig[i].parametros.forEach(parametro => {
        
        const nuevoSimbolo = new Simbolo(parametro.id, para, _parametros.tipo, _instruccion.linea, _instruccion.columna)
        //console.log("nuevo simbolo--------------------->"+nuevoSimbolo.id+"<--->"+nuevoSimbolo.valor)
        nuevoAmbito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
    });
    const Bloque = require('./Bloque')
    //console.log("esta cosa..."+orig[i].instrucciones)
    mensaje+=Bloque(orig[i].instrucciones, nuevoAmbito,orig)
        return mensaje
    
    //console.log("aqui estamos probando esta"+orig[i].id+"tipo"+orig[i].tipo+"Se encuentra en la posicion"+i)
 //   var nuevoAmbito = new Ambito(_ambito)
//    const Bloque = require('./Bloque')
//    mensaje+=Bloque(_instruccion[i].instrucciones, nuevoAmbito)    
/*function Metodo_Funcion(_instruccion, _ambito){
    if(_instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_M){
        var mensaje = ""
        const nuevoSimbolo = new Simbolo(_instruccion.id, _instruccion.expresion, TIPO_INSTRUCCION.DECLARACION_M, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)===true){
            return "Error: El metodo '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        var nuevoAmbito = new Ambito(_ambito)
        const Bloque = require('./Bloque')

        mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
        return mensaje
        return null
    }
    else if(_instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_F){
        var mensaje = ""
        const nuevoSimbolo = new Simbolo(_instruccion.id, null, TIPO_INSTRUCCION.DECLARACION_F, _instruccion.linea, _instruccion.columna)
        var valorretorno=_ambito.existeSimbolo(nuevoSimbolo.id)
        if (valorretorno===true){
            return "Error: La funcion/metodo '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //var nuevoAmbito = new Ambito(_ambito)
        //const Bloque = require('./Bloque')
        //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
        //return mensaje
        return null
    }*/
}
module.exports = Metodo_Funcion