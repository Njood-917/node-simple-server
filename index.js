// @ts-nocheck
// const http = require("http");
// const PORT = '8080'

// http
//   .createServer((req, res) => {
//     /* handle http requests */
//   })
//   .listen(PORT);

// console.log(`Server running at http://127.0.0.1:${PORT}/`);
// import { writeFile } from 'fs';
// import http from 'http';

// const port = 8008;


// let products = [
//   { id: "1", title: "apple", price: 500 },
//   { id: "2", title: "samsung", price: 600 },
// ];

// const server = http.createServer((req, res) => {
//   // set
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   if (req.url === '/' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write("Hello, World!");
//     res.end();
//   }

//   if (req.url === '/products' && req.method === 'GET') {
//     try {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.write(JSON.stringify(products));
//       res.end();
//     } catch (error) {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.write('server error');
//       res.end();
//     }
//   }
//   if (req.url === '/products' && req.method === 'POST') {
//     let body = '';

//     // Handling data chunks
//     req.on('data', (chunk) => {
//       body += chunk;
//     });

//     // Handling end of data
//     req.on('end', () => {
//       try {
//         // Parse the incoming JSON data
//         const newProduct = JSON.parse(body);
//         products.push(newProduct);

//         // Write the updated data to product.json
//         writeFile('product.json', JSON.stringify(products, null, 2), (error) => {
//           if (error) {
//             console.log('something went wrong', error);
//             res.writeHead(500, { 'Content-Type': 'text/plain' });
//             res.write('server error');
//             res.end();
//             return;
//           }

//           console.log('data written successfully');
          
//           // Respond with the updated products
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.write(JSON.stringify(products));
//           res.end();
//         });
//       } catch (error) {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.write('server error');
//         res.end();
//       }
//     });
//   }
// });

// server.listen(port, () => {
//   console.log(`server is running at http://localhost:${port}`);
// });
//   }
//   if (req.url === '/products' && req.method === 'POST')
//   writeFile('product.json' , JSON.stringify(products , null))
// if (error){
//   console.log('somthing error' , error)
//   return ;
// }
// console.log('data written sucessfully')
// });
// ;
// server.listen(port, () => 
//   console.log(`recevied POST request data`));
 

// console.log(`server is running at http://localhost:${port}`);
import { writeFile } from 'fs';
import http from 'http';

const port = 8008;

let products = [
  { id: "1", title: "apple", price: 500 },
  { id: "2", title: "samsung", price: 600 },
];

const server = http.createServer((req, res) => {
  // set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("Hello, World!");
    res.end();
  }

  if (req.url === '/products' && req.method === 'GET') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(products));
      res.end();
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write('server error');
      res.end();
    }
  }

  if (req.url === '/products' && req.method === 'POST') {
    let body = '';

    // Handling data chunks
    req.on('data', (chunk) => {
      body += chunk;
    });

    // Handling end of data
    req.on('end', () => {
      try {
        // Parse the incoming JSON data
        const newProduct = JSON.parse(body);
        products.push(newProduct);

        // Write the updated data to product.json
        writeFile('product.json', JSON.stringify(products, null, 2), (error) => {
          if (error) {
            console.log('something went wrong', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('server error');
            res.end();
            return;
          }

          console.log('data written successfully');
          
          // Respond with the updated products
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(products));
          res.end();
        });
      } catch (error) {
        console.log('parsing error', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('server error');
        res.end();
      }
    });
  }
});

server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
