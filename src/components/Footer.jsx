const Footer = () => (
  <footer
    className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 border-t border-white/10 bg-black/60"
    role="contentinfo"
    aria-label="Pie de página"
  >
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      <span className="font-heading text-xl sm:text-2xl text-white">
        DANGER AK
      </span>
      <p className="font-body text-gray-500 text-sm text-center sm:text-right">
        © {new Date().getFullYear()} Danger AK. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
