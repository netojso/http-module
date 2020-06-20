const http = require('http');
const url = require('url');
const fs = require('fs');

function HandleFile (req, res, callback) {

    let path =  url.parse(req.url).pathname;
    console.log(path + "-")
    if (path == "" || path == "/") {
        path = "/index.html"
    }
    let filename = "." + path;
    console.log(filename + "--")

   fs.readFile(filename, (error, data) => {
       if (error) {
           if (callback) {
               callback(req, res)
           } else {
            res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
            res.end("<h1>Página não encontrada</h1>")
           }
           
       } else {
           res.writeHead(200, {"Content-Type": "text/html"});
           res.end(data)
       }
       
   })

}

function HandleRequest (req, res) {
    let path =  url.parse(req.url).pathname;

    let method = req.method;
    console.log(method + "---")

    if (path == "/teste"){
        res.end("Teste")
        return true;
    }
    return false;
}

http.createServer((request, response) => {

    HandleFile (request, response, HandleRequest)
   

}).listen(3000, (err) => {
    if (err) { 
        console.log(err) }
        else {
            console.log("Servidor funcionando na porta 3000")
        }

})