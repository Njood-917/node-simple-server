// @ts-nocheck
import http from "http";
import {parse} from 'querystring'
import fs from "fs/promises";

const port = 3002;


const errorResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "appliction/json" });
  res.end(
    JSON.stringify({
      message: message,
    })
  );
};
const successResponse = (res, statusCode, message, payload = {}) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: message,
      payload: payload,
    })
  );
};
const server = http.createServer(async(req, res) => {
  if (req.url === "/" && req.method === "GET") {
    try {
      successResponse(res, 200, "hello world");
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else if (req.url === "/products" && req.method === "GET") {
    try {
      const products = JSON.parse(await fs.readFile("products.json", "utf-8")) // convert it to utf-8 to understand the data

      successResponse(res, 200, "return all products", products);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (String(req.url).match(/\/products\/([0-9]+)/) && req.method === "GET") {
    try {
        const id = parseInt(req.url?.split('/')[2]); // Convert id to number
        const product = products.find((product) => product.id == id); // Use loose equality

        successResponse(res, 200, "return a single product", product);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}
else if (req.url === "/products" && req.method === "POST") {
    try {
        let body = "" ; // string 
        req.on('data', (chunk)=>{
            body = body + chunk;
            console.log(body)
        });
        req.on('end',async()=>{
            const data = parse(body)
            console.log(data)
            // inside data title , price 
            const newProduct = {
                id: new Date().getTime().toString(),
                title: String(data.title),
                price: Number(data.price),
            };
           //get excisting products from the file 
           const exicitingProducts = JSON.parse(await fs.readFile("products.json","utf-8"))
           // add the new product to the excisting product
           exicitingProducts.push(newProduct)
           //write the file 
           await fs.writeFile("products.json", JSON.stringify(exicitingProducts))

            
        });
       
      successResponse(res, 200, "new product is created");
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
});
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port} `);
});
