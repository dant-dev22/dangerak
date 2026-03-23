const BG_URL =
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1920&q=80";

const ParallaxBackground = () => (
  <div
    className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Capa fija al viewport: no se desplaza con el scroll (sin transform ni parallax) */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BG_URL})` }}
    />
    <div className="absolute inset-0 bg-black/70" />
  </div>
);

export default ParallaxBackground;
