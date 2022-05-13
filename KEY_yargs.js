const yargs = require("yargs")
const child = require("child_process")

// CLAVE DE LA LLAVE
const key = "123"

// COMANDO ACCESO
const argv = yargs.command(
    "acceso",
    "Comando para levantar el servidor",
    {
        key: {
            describe: "Llave de acceso",
            demand: true,
            alias: "k"
        }
    }, 

    // EJECUCION DEL ARCHIVO INDEX.JS
    (args) => {
        args.key == key ?
        child.exec("node index.js", (err, data) => {
            err ? console.log(err) : console.log(data)
        }): 
        console.log("Credencial Incorrecta")
    }
).help().argv