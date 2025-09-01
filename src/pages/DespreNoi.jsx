import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobeEurope,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaStar,
  FaPlane,
  FaMapMarkedAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ===================== EVOLUȚIA NOASTRĂ ===================== */
function TimelineTravel() {
  const steps = [
    {
      year: "2020",
      tag: "Lansare",
      emoji: "🚀",
      title: "Lansarea TravelAir",
      desc:
        "Am pornit cu promisiunea unei rezervări rapide, curate și sigure pentru city-break-uri și sejururi.",
      cover:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1400&auto=format&fit=crop",
      chips: ["City-break", "UX rapid", "Support 24/7"],
    },
    {
      year: "2022",
      tag: "Parteneriate",
      emoji: "🌍",
      title: "Parteneriate internaționale",
      desc:
        "Am extins portofoliul cu hoteluri boutique, zboruri charter și ghizi locali verificați.",
      cover:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1400&auto=format&fit=crop",
      chips: ["Hoteluri boutique", "Charter", "Ghizi locali"],
    },
    {
      year: "2025",
      tag: "AI",
      emoji: "🤖",
      title: "Recomandări personalizate",
      desc:
        "Folosim ML pentru a propune destinații pe stilul tău: insule, ski, safari sau roadtrip.",
      cover:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1400&auto=format&fit=crop",
      chips: ["ML", "Personalizare", "A/B testing"],
    },
  ];

  return (
    <section className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-800 dark:to-indigo-900 -z-[1]" />
      <div className="max-w-5xl mx-auto px-6 text-gray-900 dark:text-white">
        <h2 className="text-3xl font-extrabold mb-10 text-center">Evoluția noastră</h2>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-[3px] bg-blue-400/60 dark:bg-white/40 rounded-full" />

          {steps.map((s, idx) => (
            <motion.div
              key={s.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.25, delay: idx * 0.06 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-[6px] md:-left-[5px] top-3 h-6 w-6 rounded-full bg-blue-500 shadow ring-4 ring-blue-300 grid place-items-center">
                <FaMapMarkedAlt className="text-white text-[12px]" />
              </div>

              <div className="ml-6 md:ml-10 rounded-2xl bg-white/85 dark:bg-white/10 backdrop-blur border border-blue-200/60 dark:border-white/20 overflow-hidden shadow-lg">
                <div className="h-32 w-full relative">
                  <img src={s.cover} alt={s.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-white/40 dark:bg-black/35" />
                  <span className="absolute left-4 top-3 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {s.year}
                  </span>
                  <span className="absolute right-4 top-3 text-xs px-2 py-1 rounded-full bg-blue-500/90 text-white">
                    {s.tag}
                  </span>
                  <div className="absolute left-4 bottom-3 text-gray-900 dark:text-white font-bold drop-shadow">
                    <div className="text-sm flex items-center gap-2">
                      <span>{s.emoji}</span> {s.title}
                    </div>
                  </div>
                </div>

                <div className="p-5 text-gray-700 dark:text-gray-200">
                  <p className="leading-relaxed">{s.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-gray-700/60 dark:text-gray-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= ECHIPA NOASTRĂ ======================= */
function TeamGrid() {
  const team = [
    {
      name: "Andreea Pop",
      role: "Consultant Luxury & City-Break",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      bio:
        "Planifică city-break-uri sofisticate și sejururi luxury în Europa. 300+ itinerarii personalizate.",
      specialties: ["City-break", "Hoteluri 5★", "Gastronomie"],
      langs: ["🇷🇴", "🇬🇧", "🇫🇷"],
      socials: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Ioana Radu",
      role: "Insule & Honeymoon Expert",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop",
      bio:
        "Sejururi exotice, lună de miere și retreat-uri. Portofoliu: Maldive, Santorini, Bali.",
      specialties: ["Honeymoon", "All-inclusive", "Retreat"],
      langs: ["🇷🇴", "🇬🇧", "🇮🇹"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
    },
    {
      name: "Mihai Iacob",
      role: "Aventură & Ski Planner",
      rating: 4.9,
      photo:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
      bio:
        "Creionează circuite active: Alpi, Dolomiți, Norvegia. Ghizi certificați UIAGM.",
      specialties: ["Ski", "Hiking", "Roadtrip"],
      langs: ["🇷🇴", "🇩🇪", "🇬🇧"],
      socials: { linkedin: "#", github: "#" },
    },
    {
      name: "Sara Dima",
      role: "Safari & Africa Specialist",
      rating: 4.9,
      photo:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      bio:
        "Rezervă lodge-uri în Serengeti, Okavango și Kruger. Programări foto-safari premium.",
      specialties: ["Safari", "Photo-tour", "Lodge"],
      langs: ["🇷🇴", "🇬🇧", "🇪🇸"],
      socials: { linkedin: "#", twitter: "#" },
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="max-w-6xl mx-auto px-4 md:px-6 mt-16"
    >
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-100">
          Echipa noastră
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Consultanți specializați pe destinații și stiluri de vacanță – exact ce ai nevoie
          pentru o călătorie reușită.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, idx) => (
          <motion.article
            key={m.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="group relative rounded-3xl bg-white/80 dark:bg-gray-800/70 backdrop-blur border border-white/60 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="pt-6 px-6 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 blur-md opacity-30" />
                <img
                  src={m.photo}
                  alt={m.name}
                  className="relative h-28 w-28 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow-lg"
                />
              </div>
              <h4 className="mt-4 text-lg font-bold text-blue-900 dark:text-blue-100 text-center">
                {m.name}
              </h4>
              <span className="mt-1 inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                {m.role}
              </span>
            </div>

            <div className="px-6 pb-6">
              <div className="mt-3 flex items-center justify-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={i < Math.round(m.rating) ? "" : "opacity-40"} />
                ))}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {m.rating.toFixed ? m.rating.toFixed(1) : m.rating}/5
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                {m.bio}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {m.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Limbi:</span>
                <div className="flex gap-1">{m.langs.map((f) => <span key={f}>{f}</span>)}</div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                {m.socials.linkedin && (
                  <a
                    href={m.socials.linkedin}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-white/60 dark:border-gray-700 hover:scale-105 transition"
                    title="LinkedIn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin className="text-[#0A66C2]" />
                  </a>
                )}
                {m.socials.github && (
                  <a
                    href={m.socials.github}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-white/60 dark:border-gray-700 hover:scale-105 transition"
                    title="GitHub"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                  </a>
                )}
                {m.socials.twitter && (
                  <a
                    href={m.socials.twitter}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-white/60 dark:border-gray-700 hover:scale-105 transition"
                    title="Twitter / X"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter className="text-[#1DA1F2]" />
                  </a>
                )}

                <Link
                  to="/oferte"
                  className="ml-2 text-xs px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Vezi itinerarii
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 group-hover:ring-white/30 dark:group-hover:ring-white/10 transition" />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

/* ========================== PAGINA ========================== */
export default function DespreNoi() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Despre <span className="text-blue-400">TravelAir</span>
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Călătoria ta începe cu noi – oferim experiențe unice și vacanțe memorabile.
          </p>
        </motion.div>
      </section>

      {/* MISIUNE / VIZIUNE / VALORI */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <FaGlobeEurope />,
            title: "Misiunea noastră",
            text: "Să facem călătoriile accesibile și simple pentru toată lumea.",
          },
          {
            icon: <FaRocket />,
            title: "Viziunea noastră",
            text: "Să devenim alegerea #1 pentru vacanțe inteligente în România.",
          },
          {
            icon: <FaHandshake />,
            title: "Valorile noastre",
            text: "Siguranță, încredere și experiențe autentice.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow p-8 text-center border border-white/50 dark:border-gray-700"
          >
            <div className="text-4xl text-blue-600 dark:text-blue-300 mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* EVOLUȚIA NOASTRĂ */}
      <TimelineTravel />

      {/* ECHIPA NOASTRĂ */}
      <TeamGrid />

      {/* STATISTICI */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <FaUsers />, label: "Clienți fericiți", value: "5000+" },
            { icon: <FaMapMarkedAlt />, label: "Destinații", value: "120+" },
            { icon: <FaStar />, label: "Rating mediu", value: "4.9" },
            { icon: <FaPlane />, label: "Zboruri zilnice", value: "200+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ultima Parte */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-blue-100 mb-6">
          Ești gata să-ți planifici următoarea aventură?
        </h2>
        <Link
          to="/oferte"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow"
        >
          Vezi Ofertele
        </Link>
      </section>
    </div>
  );
}
