import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import BookingForm from '../components/BookingForm';

const OfferDetails = () => {
  const { id } = useParams();
  const { token, isAuthenticated } = useAuth();
  const [oferta, setOferta] = useState(null);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [eroare, setEroare] = useState(null);
  const recenziiEndRef = useRef(null);

  const fetchOferta = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/oferte/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        setEroare("Neautorizat – autentifică-te din nou.");
        return;
      }
      const data = await res.json();
      setOferta(data);
    } catch (err) {
      console.error("Eroare la încărcarea ofertei:", err);
      setEroare("Eroare la conectarea cu serverul.");
    }
  };

  useEffect(() => {
    if (token) fetchOferta();
  }, [id, token]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Trebuie să fii autentificat pentru a adăuga o recenzie.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/oferte/${id}/recenzii/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: parseInt(newRating),
          text: newText,
        }),
      });

      if (res.ok) {
        setNewRating(5);
        setNewText("");
        await fetchOferta();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setTimeout(() => {
          if (recenziiEndRef.current) {
            recenziiEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 400);
      } else {
        alert("Eroare la trimiterea recenziei.");
      }
    } catch (err) {
      alert("A apărut o problemă la rețea.");
      console.error(err);
    }
  };

  if (eroare) return (
    <div className="text-center text-red-600 dark:text-red-400 p-10">{eroare}</div>
  );

  if (!oferta) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-10 dark:text-white">
      Se încarcă...
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow relative"
    >
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2"
          >
            <FaCheckCircle className="text-white animate-bounce" />
            Recenzia a fost trimisă cu succes!
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={new URL(oferta.imagine, 'http://localhost:8000/media/').href}
        alt={oferta.titlu}
        className="w-full h-64 object-cover rounded-xl"
      />
      <h1 className="text-3xl font-bold mt-4 text-blue-800 dark:text-blue-300">{oferta.titlu}</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{oferta.descriere}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Destinație: {oferta.destinatie}</p>
      <p className="text-md mt-2">Durată: {oferta.durata}</p>
      <p className="text-md">Transport: {oferta.transport}</p>
      <p className="text-md">Cazare: {oferta.tip_cazare}</p>
      <p className="text-md">Locuri disponibile: {oferta.numar_locuri}</p>
      <p className="text-md">Facilități: {oferta.facilitati}</p>
      <p className="mt-4 text-xl text-orange-600 font-semibold">
        Preț: {parseFloat(oferta.pret).toFixed(2)}€
      </p>
      <p className="mt-2 text-sm">Rating general: {oferta.rating}/5</p>

      <BookingForm ofertaId={oferta.id} />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recenzii</h2>

        {isAuthenticated ? (
          <form onSubmit={handleSubmitReview} className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <label className="block text-sm font-medium mb-2">Rating:</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="mb-3 w-full rounded p-2 dark:bg-gray-700 dark:text-white"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} ⭐</option>
              ))}
            </select>

            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Scrie recenzia ta..."
              className="w-full rounded p-2 mb-3 dark:bg-gray-700 dark:text-white"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Trimite recenzie
            </button>
          </form>
        ) : (
          <p className="text-red-600 text-sm mb-4">Autentifică-te pentru a adăuga o recenzie.</p>
        )}

        <div className="space-y-4">
          {oferta.reviews && oferta.reviews.length > 0 ? (
            <AnimatePresence>
              {oferta.reviews.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-b pb-2 border-gray-300 dark:border-gray-700"
                >
                  <p className="font-semibold">{r.user_username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rating: {r.rating} ⭐</p>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">{r.text}</p>
                </motion.div>
              ))}
              <div ref={recenziiEndRef}></div>
            </AnimatePresence>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Nu există recenzii încă.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OfferDetails;
