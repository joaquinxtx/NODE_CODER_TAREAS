import { Router } from "express";
import ProductManager from "../manager/productsmanager.js"
const router = Router();

const productManager = new ProductManager("./products.json");

router.get("/", (req, res) => {
  res.render("home");
});



//SOLO HANDLEBARS
router.get("/home", async (req, res) => {
  try {
    const products = await productManager.getProduct();
    
    console.log(products);
    
    res.render('home', {products});
  } catch (error) {
    console.log(error);
  }
});



//HANDLEBARS Y WEB SOCKET
router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProduct();
    
    
    res.render('realTimeProducts', {products});
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const {
      title,
      description,
      price,
      stock,
      status,
      category,
    } = req.body;
    const product = {
      title,
      description,
      price,
      stock,
      status,
      category,
    };
    const productCreated = await productManager.addProduct(product);
    res.json(productCreated);
    // res.redirect(`/home/${productCreated.id}`);
  } catch (error) {
    console.log(error);
  }
});

export default router;
