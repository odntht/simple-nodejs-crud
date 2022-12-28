const http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    if (request.url === "/produto") {
      response.end(JSON.stringify({ message: "Produto" }));
    }

    if (request.url === "/usuario") {
      response.end(JSON.stringify({ message: "Usuário" }));
    }

    response.end(JSON.stringify({ message: "Qualquer outra rota" }));
  })
  .listen(4040, () => console.log("Servidor rodando na porta 4040"));
