import { useState } from "react";
import AnimateIn from "./AnimateIn";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", message: "" });
    }, 1000);
  };

  return (
    <section
      id="contacto"
      className="relative py-16 sm:py-24 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm min-h-screen flex flex-col"
      aria-labelledby="contact-title"
    >
      <AnimateIn>
        <div className="max-w-xl mx-auto w-full">
          <h2
            id="contact-title"
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-wider"
          >
            Contacto
          </h2>
          <p className="font-body text-gray-400 mb-8 sm:mb-12 font-light text-sm sm:text-base">
            Para contrataciones o mayores informes con su carrera.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" aria-label="Formulario de contacto">
            <div>
              <label htmlFor="contact-name" className="block font-body text-sm text-gray-400 mb-2">
                Nombre
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body text-sm sm:text-base
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-body text-sm text-gray-400 mb-2">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white font-body text-sm sm:text-base
                  placeholder:text-gray-500 focus:border-red-500 focus:outline-none transition-colors resize-none"
                placeholder="Tu mensaje..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-body font-medium btn-hover text-sm sm:text-base
                hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : status === "sent" ? "Enviado ✓" : "Enviar"}
            </button>
          </form>
        </div>
      </AnimateIn>
    </section>
  );
};

export default ContactSection;
