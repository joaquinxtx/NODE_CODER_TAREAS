export const productValidator = (req, res, next) => {
  const product = req.body;

  if (
    product.price !== undefined &&
    product.title !== undefined &&
    product.description !== undefined &&
    product.stock !== undefined &&
    product.status !== undefined &&
    product.category !== undefined
  ) {
    if (typeof product.price !== "number" || product.price <= 0) {
      res.status(400).send("El precio debe ser un número positivo");
    } else {
      next();
    }
  } else {
    res.status(400).send("Falta algun campo obligatorio title, description, price, thumbnail,stock,code,status,category");
  }
};
