import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";
import AnimateIn from "../components/AnimateIn";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("El carrito está vacío.");
      return;
    }
    setSending(true);
    try {
      // Simular envío (sin backend)
      await new Promise((r) => setTimeout(r, 1500));
      clearCart();
      navigate("/orden-exitosa", {
        state: {
          email: form.email,
          name: form.name,
          total,
          items: items.map((i) => ({
            name: i.product.name,
            size: i.size,
            qty: i.quantity,
            price: i.product.price,
          })),
        },
      });
    } catch {
      setError("Error al procesar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  const goToMerch = () => {
    navigate("/");
    setTimeout(() => document.getElementById("merch")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (items.length === 0 && !sending) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 flex flex-col items-center justify-center">
        <h1 className="font-heading text-2xl text-white mb-4 text-center">
          No hay productos en el carrito
        </h1>
        <button type="button" onClick={goToMerch} className="text-red-500 hover:underline">
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Danger AK</title>
      </Helmet>
      <div className="relative pt-24 pb-16 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm">
        <AnimateIn>
        <div className="max-w-2xl mx-auto">
          <Link
            to="/carrito"
            className="inline-block text-gray-400 hover:text-white font-body text-sm mb-8"
          >
            ← Volver al carrito
          </Link>

          <h1 className="font-heading text-4xl text-white mb-8 tracking-wider">
            Checkout
          </h1>
          <p className="font-body text-gray-400 mb-8">
            Compra como invitado. Recibirás un correo con los detalles de tu pedido.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-body text-sm text-gray-400 mb-2">
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="name" className="block font-body text-sm text-gray-400 mb-2">
                Nombre completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="street" className="block font-body text-sm text-gray-400 mb-2">
                Dirección de envío *
              </label>
              <input
                id="street"
                name="street"
                type="text"
                required
                value={form.street}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
                placeholder="Calle, número, colonia"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block font-body text-sm text-gray-400 mb-2">
                  Ciudad *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                    placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
                  placeholder="Ciudad"
                />
              </div>
              <div>
                <label htmlFor="state" className="block font-body text-sm text-gray-400 mb-2">
                  Estado *
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={form.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                    placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
                  placeholder="Estado"
                />
              </div>
            </div>
            <div>
              <label htmlFor="zip" className="block font-body text-sm text-gray-400 mb-2">
                Código postal *
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                required
                value={form.zip}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none max-w-[200px]"
                placeholder="CP"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block font-body text-sm text-gray-400 mb-2">
                Notas (opcional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body 
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none resize-none"
                placeholder="Instrucciones de envío..."
              />
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between font-body text-white mb-4">
                <span>Total</span>
                <span className="font-heading text-xl text-red-500">${total} MXN</span>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full px-8 py-4 bg-white text-black font-body font-medium btn-hover
                  hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
              >
                {sending ? "Procesando..." : "Confirmar compra"}
              </button>
            </div>
          </form>
        </div>
        </AnimateIn>
      </div>
    </>
  );
};

export default Checkout;
