const Ambito = require("../controller/Ambito/Ambito")
const Errores = require("../controller/Ambito/Errores")
const Simbol_list = require("../controller/Ambito/Simbol_list")
const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            /*console.log("----------------------------------------") 
            console.log(ast)
            console.log("----------------------------------------")*/
            const Error = new Errores()
            const Simbol= new Simbol_list()
            ast.errores.forEach(error => {
                Error.addErrores(error)
            });
            
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var devuelve = Global(ast.arbol, AmbitoGlobal,Error,"Global",Simbol)

            var resultado = {
                arbol: ast.arbol,
                errores: Error,
                Simbol_lit:Simbol,
                consola: devuelve
            }
            res.send(resultado)
            //console.log("---------------act-------------------------")
            //console.log(Error)
            //console.log("----------------------------------------")
            //console.log(Simbol)
        //} catch (error) {
        //    res.send(error)
        //}
    })
}
