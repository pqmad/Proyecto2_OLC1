const Ambito = require("../controller/Ambito/Ambito")
const Errores = require("../controller/Ambito/Errores")
const Simbol_list = require("../controller/Ambito/Simbol_list")
const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")
const Grafico = require("../controller/Instruccion/Grafico")
const Generar_Graf = require("../controller/Instruccion/Generar_Graf")
module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            const Error = new Errores()
            const Simbol= new Simbol_list()
            var devuelve=""
            ast.errores.forEach(error => {
                Error.addErrores(error)
                devuelve+="Error "+error.tipo+": "+error.descripcion+"... linea: "+error.linea+" Columna: "+error.columna+"\n"
            });
            const AmbitoGlobal = new Ambito(null)
            
            devuelve=devuelve+ Global(ast.arbol, AmbitoGlobal,Error,"Global",Simbol)
            var Gdot="digraph mygraph { node [shape=box];\n"
            ast.arbol.forEach(instruccion => {
                Gdot += Grafico(instruccion,"Raiz","Raiz")
            });
            Gdot+="\n}"
            var resultado = {
                arbol: ast.arbol,
                errores: Error,
                Simbol_lit:Simbol,
                consola: devuelve
            }
            res.send(resultado)
            //console.log("---------------act-------------------------")
            //console.log(Gdot)
            //console.log("----------------------------------------")
            Generar_Graf(Gdot)
            //console.log(Simbol)
        //} catch (error) {
        //    res.send(error)
        //}
    })
}
