import {Express }from "express";
import  {Router}  from "express";// import router just from express
import { getAllProducts , getSingleProduct, deletProduct, addProduct,updateProduct } from "../controllers/productsController";
const productsRouter = Router() ; // to handle my router

productsRouter.get('/products',getAllProducts)
 productsRouter.get('/products/:id',getSingleProduct)
 productsRouter.post('/products',addProduct)
 productsRouter.delete('/products/:id',deletProduct)
 productsRouter.put('/products/:id',updateProduct)

 export default productsRouter;