const Ambito = require("../controller/Ambito/Ambito")
//const Ambito_MF = require("../controller/Ambito/Ambito_MF")
const Bloque = require("../controller/Instruccion/Bloque")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            //const AmbitoGlobal = new Ambito_MF(null)
            //const AmbitoP = new Ambito(AmbitoGlobal)
            const AmbitoP = new Ambito(null)
            var cadena = Bloque(ast, AmbitoP,ast)
            var resultado = {
                arbol: ast,
                consola: cadena
            }
            res.send(resultado)
        //} catch (error) {
        //    res.send(error)
        //}
    })
}
