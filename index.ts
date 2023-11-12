

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import productsRouter from './routes/productsRoute'

dotenv.config();

const port = process.env.PORT || 8008;
const app: Express = express();

 app.use(express.json()) ;// to handle the body request , if you send request to body
 app.use(express.urlencoded({extended:false}))// to handle the form data
 app.use(productsRouter)
 app.use(morgan("dev"));

 app.get('/',(req: Request,res: Response)=>{
    res.send("<h1>this is get req</h1>");
 })
 
 app.listen(port,()=>{
    console.log(`server is runing at http://localhost:${port}`)
 })
