

function Generar_Graf(contenido){
    var fs = require('fs');

    fs.writeFile("ArbolAST.dot", contenido, function(err) {
        if (err) {
            return console.log(err);
        }
        var exec = require('child_process').exec, child;

        child = exec('dot -Tpdf ArbolAST.dot -o ArbolAST.pdf',
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        const { spawn } = require('child_process');
        const bat = spawn('cmd.exe', ['/c', 'ArbolAST.pdf']);

        bat.stdout.on('data', (data) => {
        console.log(data.toString());
        });

        bat.stderr.on('data', (data) => {
        console.error(data.toString());
        });

        bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
        });
        return console.log("El archivo fue creado correctamente");
    });
}

module.exports = Generar_Graf