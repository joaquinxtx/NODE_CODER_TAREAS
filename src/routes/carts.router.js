import { Router } from "express";
import CartManager from "../manager/carts.manager.js";
import ProductManager from "../manager/productsmanager.js";

const router =Router()

const cartManager = new CartManager('./carts.json')
const productManager = new ProductManager('./products.json');




//post
router.post('/',async(req,res)=>{
    try {
        const carts = await cartManager.createCart()
        res.status(200).json(carts)
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})

router.post('/:idCart/product/:idProd', async(req,res)=>{
    try {
        const cartId = req.params.idCart;
        const productId = req.params.idProd;
        
    
        // Obtener el carrito correspondiente utilizando el ID del carrito
        const cart = await cartManager.getCartById(Number(cartId));

        
    
        // Agregar el producto al carrito
        const updatedCart = await cartManager.saveProductToCart(cart,  productId);
    
        res.json(updatedCart);
      } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
      }
})

//GET
router.get('/', async(req,res)=>{
    try {
        const carts = await cartManager.getAllCarts()
        res.status(200).json(carts)
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})
router.get('/:id',async(req,res)=>{
    const{id}= req.params
    try {
        const cart= await cartManager.getCartById(Number(id))
        if(cart){
            
            res.status(200).json(cart);

        }else{
            res.status(400).send('cart not found')
        }
        
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error);
    }
})

export default router