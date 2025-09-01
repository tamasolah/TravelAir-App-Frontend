import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useAuth } from "../context/AuthContext";

const OffersCarousel = () => {
  const [oferte, setOferte] = useState([]);
  const [eroare, setEroare] = useState(null);
  const { token } = useAuth();

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let interval = setInterval(() => {
          if (slider) slider.next();
        }, 3000);
        return () => clearInterval(interval);
      },
    ]
  );

  useEffect(() => {
    const fetchOferte = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/oferte/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.warn("Eroare 401: Token invalid sau lipsă.");
          setEroare("Nu ești autorizat să vezi ofertele.");
          return;
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setOferte(data);
        } else if (Array.isArray(data.results)) {
          setOferte(data.results);
        } else if (Array.isArray(data.oferte)) {
          setOferte(data.oferte);
        } else {
          console.error("Structură necunoscută:", data);
          setEroare("Structură necunoscută a datelor.");
        }
      } catch (err) {
        console.error("Eroare la preluarea ofertelor:", err);
        setEroare("Eroare la conectarea cu serverul.");
      }
    };

    if (token) {
      fetchOferte();
    }
  }, [token]);

  if (eroare) {
    return (
      <div className="text-center text-red-600 mt-12 font-medium">
        {eroare}
      </div>
    );
  }

  if (!Array.isArray(oferte) || oferte.length === 0) {
    return (
      <div className="text-center mt-12 text-gray-500">
        Nu există oferte disponibile momentan.
      </div>
    );
  }

  return (
    <div className="mt-16 px-4">
      <div ref={sliderRef} className="keen-slider max-w-5xl mx-auto">
        {oferte.map((oferta) => (
          <div
            key={oferta.id}
            className="keen-slider__slide bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-between text-center hover:scale-105 transition-transform duration-500 ease-in-out"
          >
            <img
              src={
                oferta.imagine
                  ? new URL(oferta.imagine, "http://localhost:8000/media/").href
                  : "https://via.placeholder.com/400x200?text=Fără+imagine"
              }
              alt={oferta.titlu}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-extrabold text-blue-700">{oferta.titlu}</h3>
            <p className="text-sm text-gray-500 mb-2">{oferta.descriere}</p>
            <div className="text-yellow-500 font-semibold mb-2">
              ⭐ {oferta.rating}/5
            </div>
            <p className="text-orange-600 text-lg font-bold mt-2">
              De la{" "}
              {oferta.pret && !isNaN(oferta.pret)
                ? `${parseFloat(oferta.pret).toFixed(2)}€`
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersCarousel;
