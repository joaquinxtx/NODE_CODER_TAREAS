const fs = require ('fs')
// const viewList = (array) => {
//   if (Array.isArray(array)) {
//     if (array.length === 0) {
//       return "Empty List";
//     } else {
//       return array.map((x) => x);
//     }
//   } else {
//     return "is not array";
//   }
// };

// const array1 = [1, 2, 3, 4, 5];
// const array2 = [];
// const number = 2;

// console.log(viewList(array1));
// console.log(viewList(array2));
// console.log(viewList(number));

//           ACTIVIDAD n`1

const path = "./ususarios.json"
class ProductManager {
  constructor() {
    this.products = path;
  }
  async addProduct  (title, description, price, thumbnail,  stock) {
    const product = {
      
      title,
      description,
      price,
      thumbnail,
      id:this.#newId()+1,
      stock,
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
        return maxId
      } else {
        return [];
      }
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

  getProductById = (id) => {
  return this.products.find((product)=> product.id === id)
  };
}

const producManager = new ProductManager();
// producManager.addProduct("manzana", "manzana roja", 185 , "sin imagen" , 123 , 3)
// producManager.addProduct("manzana", "manzana roja", 185 , "sin imagen" , 123 , 3)

// console.log("Vista de productos",producManager.getProduct());
// console.log("viendo productos por id",producManager.getProductById(2));

const test = async()=>{
  const get = await producManager.getProduct()
  console.log('Primera consulta', get);
  await producManager.addProduct("manzana", "manzana roja", 185, "sin imagen", 123, 3)
}

test()



