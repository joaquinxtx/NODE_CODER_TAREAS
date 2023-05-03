import { Router } from "express";
import ProductManager from "../manager/productsmanager.js";


const productManager = new ProductManager('./products.json')

 const router =Router()

 
//GET
router.get('/',async(req,res)=>{
    try {
        const products = await productManager.getProduct()
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const{id}= req.params
        const product= await productManager.getProductById(Number(id))
        if(product){
            res.status(200).json(product)

        }else{
            res.status(400).send('Product not found')
        }
        
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})
//POST
router.post('/',async(req,res)=>{
    try {
        const product= req.body
        const newProduct= await productManager.addProduct(product)
        
            res.json(newProduct)

       
        
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})
//PUT

router.put('/:id',async(req,res)=>{
    try {
        const product= req.body
        const{id}= req.params
        const productFile= await productManager.getProductById(Number(id))
        if(productFile){
            await productManager.updateProductById(product, Number(id))
            res.send("product update successfully")
        }
        else{
            res.status(400).send('Product not found')
        }
        
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})


//DELETE
router.delete('/:id',async(req,res)=>{
    try {
        const{id}= req.params
        const products = await productManager.getProduct()
        
        if(products.length > 0){
            await productManager.deleteProductById(Number(id))
            res.send(`product id : ${id} deleted successfully`)

        }else{
            res.status(400).send('Product not found')
        }
        
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})

export default router