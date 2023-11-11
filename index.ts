

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import fs from "fs/promises";
import dotenv from "dotenv";
import productsRouter from './routes/productsRouter'

dotenv.config();

const port = process.env.PORT || 8008;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/default';
const apiKey = process.env.API_KEY;

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

// // Use Morgan middleware with different formats based on environment
// if (process.env.NODE_ENV === "production") {
//   const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });
//   app.use(morgan("combined", { stream: accessLogStream }));
// } else {
//   app.use(morgan("dev"));
// }

// app.get("/", (req: Request, res: Response) => {
//   res.send("<h1>This is a get request</h1>");
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
