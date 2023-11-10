import  express  from "express";
import morgan from "morgan";
import productRoutes from './routes/productsRoute.js'


 const app = express()
 app.use(express.json()) ;// to handle the body request , if you send request to body
 app.use(express.urlencoded({extended:false}))// to handle the form data
 app.use(productRoutes)
 app.use(morgan("dev"));

 app.get('/',(req,res)=>{
    res.send("<h1>this is get req</h1>");
 })
 
 app.listen(3003,()=>{
    console.log(`server is runing at http://localhost:3003`)
 })