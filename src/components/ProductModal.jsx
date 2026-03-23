import { useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function ProductModal({ productId, onClose }) {
  const { addItem } = useCart();
  const product = products.find((p) => p.id === productId);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images = product.images?.length
    ? product.images
    : ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"];
  const img = images[0];

  const handleAdd = () => {
    const size = product.sizes?.length > 1 ? selectedSize : product.sizes?.[0] || "Única";
    addItem(product.id, size, 1);
    setAdded(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle del producto"
    >
      <div
        className="relative w-full max-w-lg bg-[#1a0a0a] border border-white/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 text-white hover:text-red-500 transition-colors z-10"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <div className="aspect-square bg-white/5 mb-4 overflow-hidden">
            <img src={img} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="font-heading text-2xl text-white mb-2">{product.name}</h2>
          <p className="font-body text-red-500 text-xl font-medium mb-4">${product.price} MXN</p>
          <p className="font-body text-gray-400 text-sm mb-6">{product.description}</p>

          {product.sizes?.length > 1 && (
            <div className="mb-6">
              <label className="block font-body text-sm text-gray-400 mb-2">Talla</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border font-body text-sm transition-colors ${
                      selectedSize === size
                        ? "border-red-500 bg-red-500/20 text-white"
                        : "border-white/20 text-white hover:border-white/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!product.inStock ? (
            <p className="font-body text-gray-500">Agotado</p>
          ) : (
            <button
              type="button"
              disabled={(product.sizes?.length > 1 && !selectedSize) || added}
              onClick={handleAdd}
              className="w-full px-6 py-4 bg-white text-black font-body font-medium btn-hover
                hover:bg-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {added ? "Agregado ✓" : "Agregar al carrito"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
