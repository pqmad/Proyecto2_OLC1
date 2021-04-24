const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./while");
const CicloDo_While = require("./Do_While");
const Sentencia_if = require("./if");
const Sentencia_else = require("./else");
const procesarSwitch = require("./Switch");
const Ternario_F = require("./Ternario_F");
const Ciclofor = require("./for");
const casteo = require("./casteo");
//const verificaparamaetros = require("./VerificarParametros");

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    
    /*console.log(_instrucciones[0])
    console.log("******************************************************")
    console.log(_instrucciones.tipo)
    console.log(_instrucciones[0])
    console.log("******************************************************")
    console.log("******************************************************")
    console.log("******************************************************")
    console.log(_instrucciones)
    console.log(_instrucciones[1])
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(_instrucciones[2])*/
    _instrucciones.forEach(instruccion => {
        //console.log("valuando..."+instruccion.tipo)
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            if(instruccion.expresion!=""){
                cadena+=Cout(instruccion, _ambito)+'\n'
            }else{
                cadena+='\n'
            }
        }
        
        else if(instruccion.tipo === TIPO_INSTRUCCION.CASTEO){
            var mensaje = casteo(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            console.log(instruccion)
            var inst=instruccion
            if(instruccion.expresion.tipo===TIPO_INSTRUCCION.CASTEO){
                var exp = casteo(instruccion.expresion, _ambito)
                inst = {
                    tipo: instruccion.tipo,
                    id: instruccion.id,
                    expresion: exp,
                    linea: instruccion.linea,
                    columna: instruccion.columna
                }
            }
            var mensaje = Asignacion(inst, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = CicloWhile(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DO_WHILE){
            var mensaje = CicloDo_While(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var mensaje = Sentencia_if(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSE){
            var mensaje = Sentencia_else(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        /*FALTAAAAAAAAAA
        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF){
            var mensaje = sentencia_elseif(instruccion, _ambito,original)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }*/

        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var mensaje = Ciclofor(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }

        else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
            var mensaje = procesarSwitch(instruccion, _ambito);
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo===TIPO_INSTRUCCION.TERNARIO){
            var mensaje = Ternario_F(instruccion, _ambito);
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            const llamada = require("./Exec_Llamada");
            //var mensaje1=verificaparamaetros(instruccion.lista_valores,instruccion.nombre,_instrucciones)
            //if(mensaje1!=null){
              //  cadena+=mensaje1+'\n'
            //}else{ //para que no ejecute el metoo o funcion hasta que se cumpla con los parametros correctos
                //console.log("mierdita")
                //console.log (instruccion)
                var mensaje = llamada(instruccion, _ambito)
                if(mensaje!=null){
                    cadena+=mensaje+'\n'
                }
            //}
        }
    });
    return cadena
}

module.exports = Bloque