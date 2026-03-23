/**
 * Eventos del tour. Datos manuales, paginación local.
 */
const ALL_EVENTS = [
  { id: "1", date: "28 Mar 2025", venue: "Auditorio Nacional", city: "Ciudad de México", ticketUrl: "https://ticketmaster.com.mx/example" },
  { id: "2", date: "5 Abr 2025", venue: "Domo Care", city: "Guadalajara", ticketUrl: "https://ticketmaster.com.mx/example2" },
  { id: "3", date: "12 Abr 2025", venue: "Arena Monterrey", city: "Monterrey", ticketUrl: "https://ticketmaster.com.mx/example3" },
  { id: "4", date: "20 Abr 2025", venue: "Palacio de los Deportes", city: "Ciudad de México", ticketUrl: "https://ticketmaster.com.mx/example4" },
  { id: "5", date: "2 May 2025", venue: "Teatro Diana", city: "Guadalajara", ticketUrl: "https://ticketmaster.com.mx/example5" },
  { id: "6", date: "15 May 2025", venue: "Foro Sol", city: "Ciudad de México", ticketUrl: "https://ticketmaster.com.mx/example6" },
  { id: "7", date: "22 May 2025", venue: "Arena VFG", city: "Guadalajara", ticketUrl: "https://ticketmaster.com.mx/example7" },
  { id: "8", date: "30 May 2025", venue: "Coca-Cola Coliseum", city: "Monterrey", ticketUrl: "https://ticketmaster.com.mx/example8" },
  { id: "9", date: "7 Jun 2025", venue: "Auditorio Telmex", city: "Guadalajara", ticketUrl: "https://ticketmaster.com.mx/example9" },
  { id: "10", date: "14 Jun 2025", venue: "Palacio de los Deportes", city: "Ciudad de México", ticketUrl: "https://ticketmaster.com.mx/example10" },
];

const PAGE_SIZE = 5;

export async function fetchEvents(page = 1) {
  await new Promise((r) => setTimeout(r, 400));
  const start = (page - 1) * PAGE_SIZE;
  const items = ALL_EVENTS.slice(start, start + PAGE_SIZE);
  const hasMore = start + PAGE_SIZE < ALL_EVENTS.length;
  return { events: items, hasMore };
}
