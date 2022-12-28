const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];
// Check if the file exists in the current directory.

if (fs.existsSync("products.json")) {
  fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      products = JSON.parse(data);
    }
  });
} else {
  console.error(
    "Nenhum arquivo JSON encontrado, continuando aplicação sem registros iniciais..."
  );
}

// POST - Add produto
// GET - Buscar produto
// PUT - Atualizar produto
// DELETE - Deletar produto

// Body - Sempre que eu quiser enviar dados para minha app
// Params - Parametros de rota /product/12316237
// Query - Parametros da rota não obrigatórias /product/12316237&name=1123

app.post("/products", (request, response) => {
  // Nome e preço

  const { name, price } = request.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  productFile();

  return response.json(product);
});

app.get("/products", (request, response) => {
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  if (!product) {
    return response.json({ message: "Produto inexistente" });
  }

  return response.json(product);
});

app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile();

  return response.json({ message: "Produto alterado com sucesso" });
});

app.delete("/products/:id", (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex((product) => product.id === id);
  if (!productIndex) {
    products.splice(productIndex, 1);
    productFile();
    return response.json({ message: "Produto removido com sucesso" });
  }
  return response.json({ message: "Produto inexistente" });
});

productFile = () => {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Produto inserido");
    }
  });
};

app.listen(4041, () => console.log("Server na porta 4041"));
