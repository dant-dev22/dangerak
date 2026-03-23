import { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductModal from "./ProductModal";

const TYPES = ["todos", "playeras", "gorras"];
const SORT_OPTIONS = [
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
  { value: "price-asc", label: "Precio menor" },
  { value: "price-desc", label: "Precio mayor" },
  { value: "stock", label: "En stock primero" },
];

export default function TiendaCatalog({ onProductClick }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("todos");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("name-asc");

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (type !== "todos") result = result.filter((p) => p.type === type);
    if (priceMin) result = result.filter((p) => p.price >= Number(priceMin));
    if (priceMax) result = result.filter((p) => p.price <= Number(priceMax));
    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "stock") result.sort((a) => (a.inStock ? -1 : 1));
    return result;
  }, [search, type, priceMin, priceMax, inStockOnly, sort]);

  return (
    <div className="w-full">
      <div className="space-y-4 mb-6 sm:mb-8">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body text-sm sm:text-base
            placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
          aria-label="Buscar productos"
        />
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 sm:px-4 py-2 bg-white/5 border border-white/20 text-white font-body text-sm focus:border-red-500 focus:outline-none"
            aria-label="Filtrar por tipo"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t === "todos" ? "Todos" : t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Precio mín"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-24 sm:w-28 px-3 py-2 bg-white/5 border border-white/20 text-white font-body text-sm
              placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
            aria-label="Precio mínimo"
          />
          <input
            type="number"
            placeholder="Precio máx"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-24 sm:w-28 px-3 py-2 bg-white/5 border border-white/20 text-white font-body text-sm
              placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
            aria-label="Precio máximo"
          />
          <label className="flex items-center gap-2 text-white font-body text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-white/30 bg-white/5 text-red-600 focus:ring-red-500"
            />
            Solo en stock
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 sm:px-4 py-2 bg-white/5 border border-white/20 text-white font-body text-sm focus:border-red-500 focus:outline-none"
            aria-label="Ordenar"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <article
            key={product.id}
            className="bg-white/5 border border-white/10 p-4 sm:p-6 flex flex-col hover:border-red-500/30 transition-colors"
          >
            <button
              type="button"
              onClick={() => onProductClick?.(product.id)}
              className="block text-left mb-4"
            >
              <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden mb-3">
                <img
                  src={product.images?.[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-lg sm:text-xl text-white mb-1 group-hover:text-red-500">
                {product.name}
              </h3>
            </button>
            <p className="font-body text-red-500 font-medium text-sm sm:text-base mb-2">
              ${product.price} MXN
            </p>
            {!product.inStock && (
              <span className="text-gray-500 text-xs sm:text-sm mb-2 block">Agotado</span>
            )}
            <button
              type="button"
              onClick={() => onProductClick?.(product.id)}
              disabled={!product.inStock}
              className="mt-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-body font-medium btn-hover text-sm
                hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-center"
            >
              Ver producto
            </button>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 font-body py-8 sm:py-12 text-sm sm:text-base">
          No se encontraron productos.
        </p>
      )}
    </div>
  );
}
