const Simbolo = require("../Ambito/Simbolo");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Operacion = require("../Operacion/Operacion");
const Ambito = require("../Ambito/Ambito")

function VerificarParametros(tiposparametros,miId,_instruccion){
    var i=0;
    var encontrado=0;
    _instruccion.forEach(instruccion => {
        if (instruccion.id!=miId && !encontrado )
            i++
        else if (instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_M || instruccion.tipo===TIPO_INSTRUCCION.DECLARACION_F){
            //console.log("Verificando nulos-->"+tiposparametros+"<--->"+instruccion.parametros+"<-->"+instruccion.tipo +"<-->"+instruccion.id )
            if (instruccion.parametros!=null){
                
                _instruccion[i].parametros.forEach(element => {
                    //console.log("Verificando parametros 2 "+tiposparametros.tipo+"<--->"+element.tipo_dato)
                    if(tiposparametros.tipo===element.tipo_dato){
                        console.log("Verificando parametros 3")
                        encontrado=1;
                        console.log("verificando parametros este: "+tiposparametros.tipo+" tipo parametroa: "+element.tipo_dato+" Se encuentra en la posicion"+i)
                        
                    }else{
                        encontrado=0;
                    }
                });
                if(encontrado===1){
                    return null
                }
                /*if(tiposparametros.tipo===_instruccion[i].parametros.tipo_dato){
                    console.log("Verificando parametros 3")
                    encontrado=1;
                    console.log("verificando parametros este: "+tiposparametros.tipo+" tipo parametroa: "+_instruccion[i].parametros+" Se encuentra en la posicion"+i)
                    return 
                }*/

            }else if (instruccion.parametros===null && tiposparametros===null){
                encontrado=1;
                return null
            }
        }
        
    });
    if(encontrado===0){
        return "Error Semantico: La funcion/metodo '"+ miId +"' no coinciden los parametros... Linea: "+_instruccion[i].linea+" Columna: "+ _instruccion[i].columna;    
    }
}

module.exports = VerificarParametros