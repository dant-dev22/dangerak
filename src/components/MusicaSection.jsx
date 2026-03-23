import { useState, useEffect } from "react";
import AnimateIn from "./AnimateIn";
import { estrenoData } from "../data/estreno";

const platformLogos = {
  spotify: <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />,
  apple: <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98z" />,
  amazon: <path d="M15.23 17.22H14.07c-.13 0-.21-.07-.24-.2l-.42-2.6c-.36-.13-.73-.22-1.12-.28-.4-.05-.79-.08-1.18-.08-2.12 0-3.54.56-4.25 1.68-.71 1.12-.54 2.73.5 4.83z" />,
  tidal: <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L8.008 7.996l4.004 4.004 4.004-4.004L12.012 3.992zm4.004 4.004l-4.004 4.004 4.004 4.004 4.004-4.004-4.004-4.004z" />,
  youtube: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
};

const MusicaSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const { coverImage, title, youtubeId, platforms } = estrenoData;

  useEffect(() => {
    const t = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 500);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="musica"
      className="relative py-16 sm:py-24 px-4 sm:px-6 z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="musica-title"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <AnimateIn>
        <div className="relative z-10 max-w-2xl mx-auto w-full">
          <h2 id="musica-title" className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-wider text-center">
            Música
          </h2>
          <p className="font-body text-gray-400 mb-8 sm:mb-12 font-light max-w-lg mx-auto text-center text-sm sm:text-base">
            Escucha el último sencillo de Danger AK en tu plataforma favorita.
          </p>

          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className="relative w-full max-w-xs mx-auto block mb-8 sm:mb-12 focus:outline-none focus:ring-2 focus:ring-red-500 rounded overflow-hidden group"
            aria-label="Reproducir video"
          >
            <img
              src={coverImage}
              alt={`Portada: ${title}`}
              className="w-full aspect-square object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className={`block mx-auto px-8 sm:px-10 py-3 sm:py-4 text-white font-body font-medium btn-escucha ${wiggle ? "animate-wiggle" : ""}`}
          >
            Escucha ahora
          </button>

          <nav className="mt-10 sm:mt-12 space-y-2" aria-label="Plataformas de streaming">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 sm:p-4 border border-white/10 hover:border-red-500/50 transition-colors group"
              >
                <span className="flex items-center gap-3 sm:gap-4 text-white">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    {platformLogos[platform.logo]}
                  </svg>
                  <span className="font-body font-medium text-sm sm:text-base">{platform.name}</span>
                </span>
                <span className="px-3 sm:px-4 py-2 bg-white/10 text-white font-body text-sm font-medium group-hover:bg-red-600 transition-colors">
                  {platform.action}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </AnimateIn>

      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Reproductor de video"
        >
          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              title="Video Danger AK"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MusicaSection;
