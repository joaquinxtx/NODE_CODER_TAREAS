import express from "express";
import productsRouter from "./routes/products.router.js"




const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/products',productsRouter)


const PORT = 8002
app.listen(PORT , ()=>{
    console.log(`Server ok en ${PORT}`);
})