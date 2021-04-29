const Ambito = require("../controller/Ambito/Ambito")
const Errores = require("../controller/Ambito/Errores")
const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            console.log("----------------------------------------") 
            console.log(ast)
            console.log("----------------------------------------")
            const Error = new Errores()
            ast.errores.forEach(error => {
                Error.addErrores(error)
            });
            console.log(Error)
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var devuelve = Global(ast.arbol, AmbitoGlobal,Error)

            var resultado = {
                arbol: ast.arbol,
                errores: Error,
                consola: devuelve
            }
            res.send(resultado)
            console.log("---------------act-------------------------")
            console.log(Error)
            console.log("----------------------------------------")
            //console.log(AmbitoGlobal)
        //} catch (error) {
        //    res.send(error)
        //}
    })
}
