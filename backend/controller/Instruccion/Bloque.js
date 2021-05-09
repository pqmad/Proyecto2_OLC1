const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const Asignacion = require("./Asignacion");
const Cout = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./while");
const CicloDo_While = require("./Do_While");
const Sentencia_if = require("./if");
const sentencia_elseif = require("./else_if");
const procesarSwitch = require("./Switch");
const Ciclofor = require("./for");
const casteo = require("./casteo");
const Asignacion_vector = require("./Asignacion_VEC");
const Asignacion_LISTA = require("./Asignacion_LISTA");

function Bloque(_instrucciones, _ambito,_Error,_entorno,Simbol){
    var cadena = ""
    var haybreak=false;
    var hayreturn=false;
    var valorR=null;
    var haycontinue=false;
    
    _instrucciones.forEach(instruccion => {
        //console.log("valuando..."+instruccion.tipo)
        if(haybreak){
            return{
                haybreak: haybreak,
                cadena: cadena,
                hayreturn:hayreturn,
                retorno:valorR,
                haycontinue:haycontinue
            }
        }
        if(haycontinue){
            return{
                haybreak: haybreak,
                cadena: cadena,
                hayreturn:hayreturn,
                retorno:valorR,
                haycontinue:haycontinue
            }
        }
        if(hayreturn){
            return{
                haybreak: haybreak,
                cadena: cadena,
                hayreturn:hayreturn,
                retorno:valorR,
                haycontinue:haycontinue
            }
        }
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            //console.log("Simbol---------------------------------print 1-----------------")
            //console.log(Simbol)
            if(instruccion.expresion!=""){
                cadena+=Cout(instruccion, _ambito,_Error,Simbol).valor+'\n'
            }else{
                cadena+='\n'
            }
            //console.log("Simbol---------------------------------print 22222222-----------------")
            //console.log(Simbol)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.CASTEO){
            var mensaje = casteo(instruccion, _ambito,_Error,Simbol)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var inst=instruccion
            if(instruccion.expresion.tipo===TIPO_INSTRUCCION.CASTEO){
                var exp = casteo(instruccion.expresion, _ambito,_Error,Simbol)
                inst = {
                    tipo: instruccion.tipo,
                    id: instruccion.id,
                    expresion: exp,
                    linea: instruccion.linea,
                    columna: instruccion.columna
                }
            }
            var mensaje = Asignacion(inst, _ambito,_Error,Simbol)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.MODIFICAR_V || instruccion.tipo === TIPO_INSTRUCCION.MODIFICAR_L){
            var inst=instruccion
            if(instruccion.valor.tipo===TIPO_INSTRUCCION.CASTEO){
                var exp = casteo(instruccion.valor, _ambito,_Error,Simbol)
                inst = {
                    tipo: instruccion.tipo,
                    id: instruccion.id,
                    posicion: instruccion.posicion,
                    valor: exp,
                    linea: instruccion.linea,
                    columna: instruccion.columna
                }
            }
            var mensaje = Asignacion_vector(inst, _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.AGREGAR_VAL_LISTA){
            var inst=instruccion
            if(instruccion.valor.tipo===TIPO_INSTRUCCION.CASTEO){
                var exp = casteo(instruccion.valor, _ambito,_Error,Simbol)
                inst = {
                    tipo: instruccion.tipo,
                    id: instruccion.id,
                    valor: exp,
                    linea: instruccion.linea,
                    columna: instruccion.columna
                }
            }
            var mensaje = Asignacion_LISTA(inst, _ambito,_Error,_entorno,Simbol)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){ // break
            var ejec = CicloWhile(instruccion, _ambito,_Error,Simbol)
            var mensaje=ejec.cadena
            haybreak=false;
            haycontinue=false;
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DO_WHILE){
            var ejec = CicloDo_While(instruccion, _ambito,_Error,Simbol)
            var mensaje=ejec.cadena
            haybreak=false
            haycontinue=false
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){ // break
            var ejec = Sentencia_if(instruccion, _ambito,_Error,Simbol)
            var mensaje=ejec.cadena
            haybreak=ejec.haybreak
            haycontinue=false
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF){
            var ejec = sentencia_elseif(instruccion, _ambito,_Error,Simbol)
            var mensaje=ejec.cadena
            haybreak=ejec.haybreak
            haycontinue=false
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var ejec = Ciclofor(instruccion, _ambito,_Error,Simbol)
            var mensaje=ejec.cadena
            haybreak=false
            haycontinue=false
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
            var ejec = procesarSwitch(instruccion, _ambito,_Error,Simbol);
            var mensaje=ejec.cadena
            haybreak=false
            haycontinue=false
            hayreturn=ejec.hayreturn
            valorR=ejec.retorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo===TIPO_OPERACION.TERNARIO){
            const Ternario = require("../Operacion/Ternario")
            var mensaje = Ternario(instruccion, _ambito,_Error,Simbol);
            if(mensaje!=null && mensaje.tipo===null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo===TIPO_INSTRUCCION.BREAK){
            haybreak=true;
            return{
                haybreak: haybreak,
                cadena: cadena,
                hayreturn: hayreturn,
                retorno:valorR,
                haycontinue:haycontinue
            }
        }
        else if(instruccion.tipo===TIPO_INSTRUCCION.CONTINUE){
            //console.log("ENTRA AL CONTINUE")
            haycontinue=true;
            return{
                haybreak: haybreak,
                cadena: cadena,
                hayreturn: hayreturn,
                retorno:valorR,
                haycontinue:haycontinue
            }
        }
        else if(instruccion.tipo===TIPO_INSTRUCCION.RETURN){
            hayreturn=true;
            valorR=instruccion.valor
            if(valorR!=null){
                const Operacion = require("../Operacion/Operacion");
                valorR=Operacion(valorR, _ambito,_Error,_entorno,Simbol)
            }
            /*console.log("RETURN--------------------------------------1")
            console.log(valorR)
            console.log("RETURN--------------------------------------2")*/
            return{
                haybreak: haybreak,
                cadena: cadena,
                hayreturn: hayreturn,
                retorno:valorR,
                haycontinue:haycontinue
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            const llamada = require("./Exec_Llamada");
            //console.log("Simbol---------------------------------llamada desde bloque-----------------")
            //console.log(Simbol)
                var ejec = llamada(instruccion, _ambito,_Error,_entorno,Simbol)
                hayreturn=ejec.hayreturn
                valorR=ejec.retorno
                var mensaje=ejec.cadena
                if(mensaje!=null){
                    cadena+=mensaje
                }
                
        }
    });
    return{
        haybreak: haybreak,
        cadena: cadena,
        hayreturn: hayreturn,
        retorno:valorR,
        haycontinue:haycontinue
    }
}

module.exports = Bloque