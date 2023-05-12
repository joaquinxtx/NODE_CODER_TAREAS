import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import handlebars from 'express-handlebars'
import { __dirname } from "./path.js";

import viewsRouter from './routes/views.router.js'





const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.use('/', viewsRouter)




const PORT = 8002
app.listen(PORT , ()=>{
    console.log(`Server ok en ${PORT}`);
})