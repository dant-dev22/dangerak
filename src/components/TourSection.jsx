import { useState, useEffect } from "react";
import { fetchEvents } from "../api/events";
import AnimateIn from "./AnimateIn";

const TourSection = ({ sectionRef }) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchEvents(1).then(({ events: data, hasMore: more }) => {
      if (!cancelled) {
        setEvents(data);
        setHasMore(more);
        setPage(1);
        setLoading(false);
        setAllLoaded(!more);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    fetchEvents(nextPage).then(({ events: newEvents, hasMore: more }) => {
      setEvents((prev) => [...prev, ...newEvents]);
      setHasMore(more);
      setPage(nextPage);
      setLoading(false);
      setAllLoaded(!more);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="tour"
      className="relative py-16 sm:py-24 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm min-h-screen flex flex-col"
      aria-labelledby="tour-title"
    >
      <AnimateIn>
        <div className="max-w-4xl mx-auto w-full">
          <h2
            id="tour-title"
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-10 sm:mb-12 tracking-wider"
          >
            Próximas fechas
          </h2>

          <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12" role="list">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 
                  p-4 sm:p-6 border border-white/10 hover:border-red-500/50 transition-colors"
              >
                <div>
                  <time className="block font-heading text-lg sm:text-xl text-red-500 mb-1" dateTime={event.date}>
                    {event.date}
                  </time>
                  <span className="font-body text-white font-medium text-sm sm:text-base">{event.venue}</span>
                  <span className="block font-body text-gray-400 text-xs sm:text-sm">{event.city}</span>
                </div>
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-body font-medium btn-hover text-sm sm:text-base
                    hover:bg-red-600 hover:text-white transition-colors self-start shrink-0"
                >
                  Tickets
                </a>
              </li>
            ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-body font-medium btn-hover
                hover:bg-white hover:text-black transition-colors disabled:opacity-50"
            >
              {loading ? "Cargando..." : "Ver más"}
            </button>
          )}

          {allLoaded && events.length > 0 && (
            <p className="font-body text-gray-500 text-sm sm:text-base mt-4">
              Son todas las fechas disponibles
            </p>
          )}
        </div>
      </AnimateIn>
    </section>
  );
};

export default TourSection;
