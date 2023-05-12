import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.carts = path;
  }
  async createCart() {
    const cart = {
      id: (await this.#newId()) + 1,
      products: [
        {
          id: (await this.#newIdProduct()) + 1,
          quantity:1
       
        }
      ],
    };
    try {
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.carts, JSON.stringify(cartsFile));
    } catch (error) {
      console.log(error);
    }
  }

   async #newId() {
    let maxId = 0;

    try {
      if (fs.existsSync(this.carts)) {
        const carts = await fs.promises.readFile(this.carts, "utf8");
        const cartsJS = JSON.parse(carts);
        cartsJS.map((cart) => {
          if (cart.id > maxId) maxId = cart.id;
        });
      }
      return maxId;
    } catch (error) {
      console.log(error);
    }
  }
   async #newIdProduct() {
    let maxId = 0;

    try {
      if (fs.existsSync(this.carts.products)) {
        const carts = await fs.promises.readFile(this.carts.products, "utf8");
        const cartsJS = JSON.parse(carts);
        cartsJS.map((cart) => {
          if (cart.id.products.id > maxId) maxId = cart.id.products.id;
        });
      }
      return maxId;
    } catch (error) {
      console.log(error);
    }
  }

  

  async getAllCarts() {
    try {
      if (fs.existsSync(this.carts)) {
        const carts = await fs.promises.readFile(this.carts, "utf8");
        const cartsJS = JSON.parse(carts);
        return cartsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  getCartById = async (id) => {
    try {
      if (fs.existsSync(this.carts)) {
        const carts = await fs.promises.readFile(this.carts, "utf8");
        const cartsJS = JSON.parse(carts);
        const cartId = cartsJS.find((cart) => cart.id === id);
        return cartId;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  saveProductToCart = async (cart,  productId) => {
    try {
      if (!cart) {
        throw new Error('Cart is undefined');
      }
      if (!cart.products) {
        cart.products = [];
      }
      const existingProduct = cart.products.find((p) => p.id === parseInt(productId));
      if (existingProduct) {  
         existingProduct.quantity += 1         
      } else {
        cart.products.push({ id: parseInt(productId) });
      }
      await fs.promises.writeFile(
        this.carts,
        JSON.stringify(await this.getAllCarts())
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  };
}