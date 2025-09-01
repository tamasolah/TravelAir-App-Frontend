import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

const API = "http://localhost:8000";

export default function MyBookings() {
  const { token } = useAuth();
  const [rezervari, setRezervari] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholder =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop";

  const toAbsoluteMediaUrl = (url) => {
    if (!url) return placeholder;
    if (typeof url !== "string") return placeholder;
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    if (trimmed.startsWith("/")) return `${API}${trimmed}`;
    return `${API}/media/${trimmed}`;
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    const fetchRezervari = async () => {
      try {
        const res = await axios.get(`${API}/api/rezervari/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data = res.data;
        if (!Array.isArray(data) && Array.isArray(data?.results)) {
          data = data.results;
        }
        if (!Array.isArray(data)) data = [];

        setRezervari(
          data.map((r) => ({
            id: r.id,
            persoane: r.numar_persoane,
            data: r.data_rezervare,
            titlu: r.oferta_titlu || r.oferta || "Ofertă",
            destinatie: r.oferta_destinatie || r.destinatie || null,
            imagine: toAbsoluteMediaUrl(r.oferta_imagine || r.imagine),
            ofertaId: r.oferta_id || r.id_oferta || null,
          }))
        );
      } catch (err) {
        console.error("Eroare la preluarea rezervărilor:", err);
        setRezervari([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchRezervari();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 dark:text-blue-300">
          Rezervările mele
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Vezi toate rezervările tale, frumos organizate.
        </p>
      </div>

      {loading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/40 dark:border-gray-700 animate-pulse"
            >
              <div className="h-44 bg-gray-200 dark:bg-gray-700" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && rezervari.length === 0 && (
        <div className="text-center py-16 rounded-3xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-white/50 dark:border-gray-700">
          <div className="text-6xl mb-4">🗓️</div>
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">
            Nu ai rezervări încă
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explorează ofertele noastre și rezervă-ți următoarea aventură.
          </p>
          <Link
            to="/oferte"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow"
          >
            Vezi oferte <FaExternalLinkAlt />
          </Link>
        </div>
      )}

      {!loading && rezervari.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {rezervari.map((rez, idx) => (
            <motion.div
              key={rez.id ?? idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="group rounded-2xl overflow-hidden shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/50 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <div className="relative h-44 w-full">
                <img
                  src={rez.imagine}
                  alt={rez.titlu}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white text-lg font-bold drop-shadow">
                    {rez.titlu}
                  </h3>
                  {rez.destinatie && (
                    <p className="text-white/90 text-sm flex items-center gap-2">
                      <FaMapMarkerAlt className="text-emerald-300" />
                      {rez.destinatie}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 px-3 py-1 rounded-full">
                    <FaUser /> {rez.persoane} {rez.persoane === 1 ? "persoană" : "persoane"}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200 px-3 py-1 rounded-full">
                    <FaCalendarAlt /> {formatDate(rez.data)}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ID Rezervare: <span className="font-medium">{rez.id}</span>
                  </div>

                  {rez.ofertaId ? (
                    <Link
                      to={`/oferta/${rez.ofertaId}`}
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:underline"
                      title="Vezi detalii ofertă"
                    >
                      Vezi oferta <FaExternalLinkAlt className="text-xs" />
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-sm">fără link ofertă</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
