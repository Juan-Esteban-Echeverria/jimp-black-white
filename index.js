const http = require("http")
const url = require('url')
const fs = require("fs")
const Jimp = require("jimp")

// CREACION DEL SERVIDOR
http.createServer((req,res)=>{

    const params = url.parse(req.url, true).query
    const {http} = params

    // RUTA HTML
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile("index.html", (err, data)=>{
            res.end(data)
        })
    }

    // RUTA ESTILOS
    if(req.url.includes("/estilo")){
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile("estilo.css", (err, data)=>{
            res.end(data)
        })
    }


    // RUTA JIMP
    if(req.url.includes("/imagen")){
        Jimp.read(http, (err, imagen)=>{
            imagen.resize(350, Jimp.AUTO)
            .quality(60)
            .greyscale()
            .writeAsync("newImg.jpg")
            .then(()=>{
                fs.readFile("newImg.jpg", (err, imagenLeida)=>{
                    res.writeHead(200, {'Content-Type': 'image/jpg'})
                    res.end(imagenLeida)
                })
            })
        })
    }



}).listen(5000, ()=>{
    console.log("Server ON")
})