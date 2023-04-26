const fs = require ('fs');
const { title } = require('process');
//           ACTIVIDAD n`1


class ProductManager {
  constructor(path ) {
    this.products = path;
  }
  async addProduct  (title, description, price, thumbnail,  stock,code) {
    const product = {
      
      id: await this.#newId()+1,
      title,
      description,
      price,
      thumbnail,
      stock,
      code
    };
    try {
      const productFile = await this.getProduct();
      productFile.push(product);
      await fs.promises.writeFile(this.products, JSON.stringify(productFile));
    } catch (error) {
      console.log(error);
    }
     
  };

  async #newId() {
    let maxId = 0;
   
    // return maxId;

    try {
      if (fs.existsSync(this.products)) {
        const products = await fs.promises.readFile(this.products, "utf8");
        const productsJS = JSON.parse(products);
         productsJS.map((product) => {
          if (product.id > maxId) maxId = product.id;
        });
      } 
      return maxId
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct()  {
    try {
      if (fs.existsSync(this.products)) {
        const products = await fs.promises.readFile(this.products, "utf8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  getProductById = async(id) => {
    try {
      if (fs.existsSync(this.products)) {
        const products = await fs.promises.readFile(this.products, "utf8");
        const productsJS = JSON.parse(products);
        const productId =productsJS.find((product)=> product.id === id)
        return productId;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  
  };
  deleteProductById = async(id) => {
    try {
      if (fs.existsSync(this.products)) {
        const products = await fs.promises.readFile(this.products, "utf8");
        const productsJS = JSON.parse(products);
        const newProducts = productsJS.filter((product) => product.id !== id);
        await fs.promises.writeFile(this.products, JSON.stringify(newProducts));
        return newProducts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  
  };

  updateProductById = async (id, newData) => {
    try {
      if (fs.existsSync(this.products)) {
        const products = await fs.promises.readFile(this.products, "utf8");
        const productsJS = JSON.parse(products);
        const updatedProducts = productsJS.map((product) => {
          if (product.id === id) {
            const { title, description, price, thumbnail, id, stock } = { ...product, ...newData };
            return { title, description, price, thumbnail, id, stock }
          }
          return product;
        });
        await fs.promises.writeFile(this.products, JSON.stringify(updatedProducts));
        return updatedProducts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const producManager = new ProductManager("./productos.json");


const test = async()=>{
  const get = await producManager.getProduct()
  console.log('Primera consulta', get);
   await producManager.addProduct("manzana", "manzana roja", 185, "sin imagen", 123, 3,"manzana1")
 console.log("ID",await producManager.getProductById(5)) 
 console.log("DELETE",await producManager.deleteProductById(3)) 
 console.log("ACTULIZADAS",await producManager.updateProductById(1,{title:"Nueva mandarina"})) 
}

test()



