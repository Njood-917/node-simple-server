import { Request, Response } from 'express';
// import fs from "fs/promises"
import { promises as fsPromises } from 'fs';
interface Product {
  id: string;
  title: string;
  price: number;
}

let products: Product[]  = [
  { id: "1", title: "product1", price: 500 },
  { id: "2", title: "product2", price: 600 }
];

export const getAllProducts = async(req:Request, res:Response) => {
  const products: Product[] = JSON.parse(await fsPromises.readFile("products.json", "utf-8"));

    console.log(products)
  res.status(200).send({
    success: true,
    message: "all products are returned",
    payload: products,
  });
};
export const getSingleProduct = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const productsFromFile: Product[] = JSON.parse(await fsPromises.readFile("products.json", "utf-8"));
    const product: Product | undefined = productsFromFile.find((product) => product.id === id);

    if (!product) {
      res.status(404).send({
        success: false,
        message: "product not found",
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: `single product is returned`,
      payload: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};


// export const getSingleProduct = (req:Request, res:Response) => {
//   const id:string  = req.params.id;
//   const product:Product | undefined  = products.find((product) => product.id === id);
//   if (!product) {
//     res.status(404).send({
//       success: false,
//       message: "product not found",
//     });
//     // return;
//   }
//   res.status(200).send({
//     success: true,
//     message: `single product is returned`,
//     payload: product,
//   });
// };

export const deletProduct = (req:Request, res:Response) => {
  const id: String   = req.params.id;
  const product:Product | undefined = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).send({
      success: false,
      message: "product not found",
    });
    return;
  }

  const filterProducts: Product[] = products.filter((product) => product.id !== id);
  products = filterProducts;
  res.status(200).send({
    success: true,
    message: `single product is deleted`,
  });
};

export const addProduct =(req: Request, res: Response) => {
    console.log(req.body)
    const newProduct:Product = {
        id:new Date().getTime().toString(),
        title: req.body.title,
        price: req.body.price,
    };
    products.push(newProduct)
    res.status(201).send({
      success: true,
      message: "add product ",
    });
  };
  export const updateProduct = (req: Request, res:Response) => {
    const id:string  = req.params.id;
    const index: number  = products.findIndex((product)=> product.id === id)//find the product that i want update it
    if (index === -1){
        res.status(404).send({
            success: false,
            message: `product not found with the id`
        })
        return;
    }
    products[index].title = req.body.title;
    products[index].price = req.body.price;
    
    res.status(200).send({
        success: true,
        message: `single product is updated`,
        payload: products[index], 
      });
    };
  

  