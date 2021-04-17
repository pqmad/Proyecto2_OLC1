const Simbolo = require("../Ambito/Simbolo");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Operacion = require("../Operacion/Operacion");
const Ambito = require("../Ambito/Ambito")

function VerificarParametros(tiposparametros,miId,_instruccion){
    var i=0;
    var encontrado=0;
    _instruccion.forEach(instruccion => {
        if (instruccion.id!=miId && !encontrado && (instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_M || instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_F))
            i++
        else{
            if (instruccion.parametros!=null)
            if(tiposparametros.tipo===instruccion.parametros){
                encontrado=1;
                console.log("verificando parametros este: "+tiposparametros.tipo+" tipo parametroa: "+_instruccion[i].parametros+" Se encuentra en la posicion"+i)
                return 
            }
        }    
        return "Error Semantico: La funcion/metodo '"+ miId.id +"' no coinciden los parametros... Linea: "+instruccion.linea+" Columna: "+ instruccion.columna;    
    });
    
}

module.exports = VerificarParametros