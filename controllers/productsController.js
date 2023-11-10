import fs from "fs/promises"

let products = [
  { id: "1", title: "product1", price: 500 },
  { id: "2", title: "product2", price: 600 }
];

export const getAllProducts = async(req, res) => {
    const products =  JSON.parse(await fs.readFile("products.json", "utf-8"));
    console.log(products)
  res.status(200).send({
    success: true,
    message: "all products are returned",
    payload: products,
  });
};

export const getSingleProduct = (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);
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
};

export const deletProduct = (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).send({
      success: false,
      message: "product not found",
    });
    return;
  }

  const filterProducts = products.filter((product) => product.id !== id);
  products = filterProducts;
  res.status(200).send({
    success: true,
    message: `single product is deleted`,
  });
};

export const addProduct =(req, res) => {
    console.log(req.body)
    const newProduct = {
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
  export const updateProduct = (req, res) => {
    const id = req.params.id;
    const index = products.findIndex((product)=> product.id === id)//find the product that i want update it
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
  

  