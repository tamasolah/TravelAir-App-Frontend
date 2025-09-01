import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FaMapMarkerAlt,
  FaTag,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaBolt,
  FaChevronRight,
  FaPlaneDeparture,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";

const API = "http://localhost:8000";

const buildImage = (src) => {
  if (!src) return null;
  try {
    if (src.startsWith("/")) return `${API}${src}`;
    if (/^https?:\/\//i.test(src)) return src;
    return `${API}/${src.replace(/^\//, "")}`;
  } catch {
    return null;
  }
};

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <Hero onCTAClick={() => navigate("/oferte")} user={user} />
      <PopularDestinationsCarousel />
      <SpecialDealsCarousel />
      <Testimonials />
      <WhyUs />
      <BlogTeasers />
      <Newsletter />
    </div>
  );
}

function Hero({ onCTAClick, user }) {
  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-100 tracking-tight">
            Bine ai venit{user?.username ? `, ${user.username}` : ""} la{" "}
            <span className="inline-flex items-center gap-3">
              TravelAir <FaPlaneDeparture className="text-blue-600 dark:text-blue-300" />
            </span>
          </h1>
          {user?.email && (
            <p className="mt-3 text-sm text-blue-700/80 dark:text-blue-200/80">
              Te-ai autentificat cu: <span className="font-medium">{user.email}</span>
            </p>
          )}
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Explorează cele mai bune oferte de vacanță, descoperă destinații noi și rezervă-ți următoarea aventură din
            câteva click-uri.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={onCTAClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
            >
              Vezi toate ofertele
            </button>
            <Link
              to="/rezervarile-mele"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-blue-700 dark:text-blue-200 hover:bg-white shadow-sm"
            >
              Rezervările mele <FaChevronRight className="group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ArrowButton({ onClick, direction = "left", className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "prev" : "next"}
      className={`hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2
      ${direction === "left" ? "left-2" : "right-2"} h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow
      hover:scale-105 transition ${className}`}
    >
      <FaChevronRight className={`${direction === "left" ? "rotate-180" : ""}`} />
    </button>
  );
}

function HorizontalCarousel({ children }) {
  const ref = useRef(null);

  const slide = (dir) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.clientWidth + 16 : 320; // 16 = gap-4
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-300/70
        dark:scrollbar-thumb-gray-600/70 pb-2"
      >
        {children}
      </div>
      <ArrowButton direction="left" onClick={() => slide(-1)} />
      <ArrowButton direction="right" onClick={() => slide(1)} />
    </div>
  );
}

function PopularDestinationsCarousel() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/oferte/`, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        let data = res.ok ? await res.json() : [];
        if (!Array.isArray(data) && Array.isArray(data?.results)) data = data.results;
        if (!Array.isArray(data)) data = [];
        if (!alive) return;

        const popular = [...data]
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 8)
          .map((o) => ({
            id: o.id,
            title: o.titlu ?? "Destinație",
            location: o.destinatie ?? null,
            rating: o.rating ?? 0,
            img:
              buildImage(o.imagine) ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
          }));

        setItems(popular);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-100">Destinații populare</h3>
        <Link to="/oferte" className="text-blue-700 dark:text-blue-300 hover:underline inline-flex items-center gap-2">
          Vezi toate <FaChevronRight />
        </Link>
      </div>

      {loading ? (
        <SkeletonRow count={4} />
      ) : (
        <HorizontalCarousel>
          {items.map((d) => (
            <div
              key={d.id}
              data-card
              className="snap-start shrink-0 w-[300px] rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/70
              border border-white/50 dark:border-gray-700 shadow hover:shadow-lg"
            >
              <div className="relative h-40 w-full">
                <img src={d.img} alt={d.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white drop-shadow">
                  <div className="font-bold">{d.title}</div>
                  {d.location && (
                    <div className="text-sm opacity-90 flex items-center gap-2">
                      <FaMapMarkerAlt /> {d.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <FaStar /> {d.rating?.toFixed ? d.rating.toFixed(2) : d.rating}/5
                </span>
                <Link to={`/oferta/${d.id}`} className="text-blue-600 dark:text-blue-300 hover:underline font-medium">
                  Vezi oferta
                </Link>
              </div>
            </div>
          ))}
        </HorizontalCarousel>
      )}
    </motion.section>
  );
}

function SpecialDealsCarousel() {
  const { token } = useAuth();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/oferte/`, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        let data = res.ok ? await res.json() : [];
        if (!Array.isArray(data) && Array.isArray(data?.results)) data = data.results;
        if (!Array.isArray(data)) data = [];
        if (!alive) return;

        const avg = data.reduce((acc, o) => acc + (Number(o.pret) || 0), 0) / Math.max(1, data.length);
        const specials = data
          .filter((o) => Number(o.pret) < avg)
          .slice(0, 8)
          .map((o) => ({
            id: o.id,
            title: o.titlu ?? "Ofertă",
            price: Number(o.pret) || 0,
            location: o.destinatie ?? null,
            img:
              buildImage(o.imagine) ||
              "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop",
          }));
        setDeals(specials);
      } catch {
        setDeals([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
      <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-100 mb-6">Oferte speciale</h3>

      {loading ? (
        <SkeletonRow count={4} />
      ) : (
        <HorizontalCarousel>
          {deals.map((o) => (
            <div
              key={o.id}
              data-card
              className="snap-start shrink-0 w-[300px] rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/70
              border border-white/50 dark:border-gray-700 shadow"
            >
              <div className="relative h-40">
                <img src={o.img} alt={o.title} className="h-full w-full object-cover" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-2 bg-rose-600 text-white px-3 py-1 rounded-full shadow text-sm">
                  <FaTag /> Reducere
                </span>
              </div>
              <div className="p-4">
                <div className="font-bold text-blue-900 dark:text-blue-100">{o.title}</div>
                {o.location && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <FaMapMarkerAlt /> {o.location}
                  </div>
                )}
                <div className="mt-4 text-orange-600 dark:text-orange-300 font-extrabold text-lg">
                  De la {o.price.toFixed(2)}€
                </div>
                <Link to={`/oferta/${o.id}`} className="mt-3 inline-block text-blue-600 dark:text-blue-300 hover:underline">
                  Vezi detalii
                </Link>
              </div>
            </div>
          ))}
        </HorizontalCarousel>
      )}
    </motion.section>
  );
}

function Testimonials() {
  const items = useMemo(
    () => [
      { name: "Ana M.", text: "Experiență excelentă! Rezervarea ușoară, preț bun și suport rapid. Recomand!", stars: 5 },
      { name: "Vlad P.", text: "Am găsit pachetul perfect pentru Grecia. Totul a decurs ca la carte.", stars: 5 },
      { name: "Ioana R.", text: "Site-ul e ușor de folosit. Mi-au plăcut notificările clare.", stars: 4.5 },
    ],
    []
  );

  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 mt-16">
      <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-100 mb-6">Ce spun clienții noștri</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700 p-6 shadow"
          >
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              {[...Array(Math.floor(t.stars))].map((_, idx) => (
                <FaStar key={idx} />
              ))}
              {t.stars % 1 !== 0 && <FaStar className="opacity-60" />}
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{t.text}</p>
            <div className="mt-4 font-semibold text-blue-900 dark:text-blue-100">{t.name}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function WhyUs() {
  const features = [
    { icon: <FaBolt />, title: "Rezervare rapidă", text: "Finalizezi în câteva click-uri." },
    { icon: <FaShieldAlt />, title: "Plăți sigure", text: "Procesare securizată a plăților." },
    { icon: <FaClock />, title: "Suport 24/7", text: "Suntem mereu aici pentru tine." },
    { icon: <FaCheckCircle />, title: "Oferte verificate", text: "Pachete reale, fără surprize." },
  ];

  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 mt-16">
      <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-100 mb-6">De ce să alegi TravelAir?</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700 p-6 shadow"
          >
            <div className="text-2xl text-blue-600 dark:text-blue-300">{f.icon}</div>
            <div className="mt-3 font-bold text-blue-900 dark:text-blue-100">{f.title}</div>
            <div className="text-gray-600 dark:text-gray-400 mt-1">{f.text}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function BlogTeasers() {
  const posts = [
    {
      id: 1,
      title: "Cum îți pregătești bagajul pentru Grecia",
      excerpt: "Un ghid rapid despre ce să pui în bagaj pentru o vacanță reușită.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Top 7 plaje din Europa",
      excerpt: "Am ales pentru tine cele mai spectaculoase plaje pentru vara aceasta.",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="max-w-6xl mx-auto px-4 md:px-6 mt-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-100">Din jurnalul de călătorie</h3>
        <Link to="/oferte" className="text-blue-700 dark:text-blue-300 hover:underline">
          Vezi oferte
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700 shadow"
          >
            <img src={p.img} alt={p.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h4 className="font-bold text-blue-900 dark:text-blue-100">{p.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{p.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
  };

  return (
    <motion.section variants={sectionFade} initial="hidden" animate="show" className="w-full mt-16">
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold">Abonează-te la newsletter</h3>
              <p className="text-white/90 mt-1">Primești oferte exclusive și inspirație pentru următoarea vacanță.</p>
            </div>
            <form onSubmit={submit} className="w-full md:w-auto flex items-center gap-3">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-800" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplu.ro"
                  className="pl-10 pr-4 py-3 rounded-xl text-black w-72"
                />
              </div>
              <button type="submit" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-5 py-3 rounded-xl">
                Mă abonez
              </button>
            </form>
          </div>

          {sent && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg">
              <FaCheckCircle /> Te-ai abonat! Mulțumim. 🎉
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function SkeletonRow({ count = 4 }) {
  return (
    <div className="flex gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="snap-start shrink-0 w-[300px] rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/70
          border border-white/50 dark:border-gray-700 shadow animate-pulse"
        >
          <div className="h-40 bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
