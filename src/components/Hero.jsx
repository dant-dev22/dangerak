import { useState, useEffect } from "react";

const Hero = () => {
  const [wiggleProxima, setWiggleProxima] = useState(false);
  const [wiggleEscucha, setWiggleEscucha] = useState(false);

  useEffect(() => {
    const t1 = setInterval(() => {
      setWiggleProxima(true);
      setTimeout(() => setWiggleProxima(false), 500);
    }, 3000);
    return () => clearInterval(t1);
  }, []);

  useEffect(() => {
    const t2 = setInterval(() => {
      setWiggleEscucha(true);
      setTimeout(() => setWiggleEscucha(false), 500);
    }, 3500);
    return () => clearInterval(t2);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 z-10"
      aria-labelledby="hero-title"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1
          id="hero-title"
          className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-wider mb-6 sm:mb-8 animate-hero-enter"
          style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
        >
          DANGER AK
        </h1>
        <p
          className="font-body text-base sm:text-lg md:text-xl text-gray-300 mb-12 sm:mb-16 max-w-xl mx-auto font-light animate-hero-enter"
          style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
        >
          Rapero mexicano. Música, cultura y calle.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-hero-enter"
          style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("tour")}
            className={`w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-white font-body font-medium btn-hero
              min-w-[180px] sm:min-w-[200px] text-sm sm:text-base ${wiggleProxima ? "animate-wiggle" : ""}`}
            aria-label="Ver próxima fecha del tour"
          >
            Próxima fecha
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("musica")}
            className={`w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-white font-body font-medium btn-hero
              min-w-[180px] sm:min-w-[200px] text-sm sm:text-base ${wiggleEscucha ? "animate-wiggle" : ""}`}
            aria-label="Escuchar música ahora"
          >
            Escucha ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
