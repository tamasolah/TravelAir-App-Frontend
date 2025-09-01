import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function BookingForm({ ofertaId }) {
  const { token, isAuthenticated } = useAuth();
  const [numarPersoane, setNumarPersoane] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Trebuie să fii autentificat pentru a face o rezervare.");
      return;
    }

    setLoading(true);
    console.log("Token trimis:", token);

    try {
      await axios.post(
        'http://localhost:8000/api/rezervari/',
        {
          numar_persoane: numarPersoane,
          oferta: ofertaId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setSuccess(true);
      setNumarPersoane(1);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Eroare la trimiterea rezervării:", error);

      if (error.response?.status === 401) {
        alert("Autentificarea a eșuat. Te rugăm să te reloghezi.");
      } else {
        alert("A apărut o eroare la trimiterea rezervării.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <p className="mt-4 text-red-600">Autentifică-te pentru a face o rezervare.</p>;
  }

  return (
    <div className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md relative">
      <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
        Rezervă această ofertă
      </h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2"
        >
          <FaCheckCircle className="text-white animate-bounce" />
          Rezervarea a fost trimisă!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Număr persoane:</label>
          <input
            type="number"
            min="1"
            required
            value={numarPersoane}
            onChange={(e) => setNumarPersoane(e.target.value)}
            className="w-full rounded p-2 border dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Se trimite...' : 'Trimite rezervarea'}
        </button>
      </form>
    </div>
  );
}
