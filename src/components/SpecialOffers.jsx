import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SpecialOffers({ title = "Oferte speciale" }) {
  const [oferte, setOferte] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8000/api/oferte/?limit=4");
        const data = await res.json();

        const items = Array.isArray(data?.results) ? data.results : (Array.isArray(data) ? data : []);
        setOferte(items.slice(0, 4));
      } catch (e) {
        console.error("Eroare oferte speciale:", e);
      }
    })();
  }, []);

  if (!oferte.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-200">
          {title}
        </h2>
        <Link to="/oferte" className="text-blue-600 dark:text-blue-300 hover:underline">
          Vezi toate →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {oferte.map((o) => (
          <Link
            key={o.id}
            to={`/oferta/${o.id}`}
            className="group rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700 shadow hover:shadow-lg transition"
          >
            <div className="h-36 w-full overflow-hidden">
              <img
                src={new URL(o.imagine, "http://localhost:8000/").href}
                alt={o.titlu}
                className="h-full w-full object-cover group-hover:scale-[1.03] transition"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 line-clamp-1">
                {o.titlu}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                {o.descriere}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-orange-600 font-bold">
                  {parseFloat(o.pret).toFixed(2)}€
                </span>
                <span className="text-xs text-gray-500">
                  ⭐ {o.rating ?? 5}/5
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
