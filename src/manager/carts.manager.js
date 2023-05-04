import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.carts = path;
  }
  async createCart() {
    const cart = {
      id: (await this.#newId()) + 1,
      products: [],
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

  saveProductToCart = async (cart, productId, quantity) => {
    try {
      if (!cart) {
        throw new Error('Cart is undefined');
      }
      if (!cart.products) {
        cart.products = [];
      }
      const existingProduct = cart.products.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
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