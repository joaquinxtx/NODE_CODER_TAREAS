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

class ProductManager {
  constructor() {
    this.products = [];
  }
  addProduct = (title, description, price, thumbnail,  stock) => {
    const product = {
      
      title,
      description,
      price,
      thumbnail,
      id:this.#newId()+1,
      stock,
    };
    
    
    this.products.push(product);
  };

  #newId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  getProduct = () => {
    return this.products;
  };

  getProductById = (id) => {
  return this.products.find((product)=> product.id === id)
  };
}

const producManager = new ProductManager();
producManager.addProduct("manzana", "manzana roja", 185 , "sin imagen" , 123 , 3)
producManager.addProduct("manzana", "manzana roja", 185 , "sin imagen" , 123 , 3)

console.log("Vista de productos",producManager.getProduct());
console.log("viendo productos por id",producManager.getProductById(2));

