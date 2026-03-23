/**
 * Productos del catálogo. Datos manuales desde src/data/products.js
 */
import { products } from "../data/products";

export async function fetchProducts() {
  await new Promise((r) => setTimeout(r, 200));
  return products;
}
