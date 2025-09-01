import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Reviews({ ofertaId }) {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/oferte/${ofertaId}/recenzii/`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Nu am putut încărca recenziile.');
        setLoading(false);
      });
  }, [ofertaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Textul recenziei este obligatoriu.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/oferte/${ofertaId}/recenzii/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, rating }),
      });

      if (!response.ok) {
        throw new Error('Eroare la trimiterea recenziei.');
      }

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setText('');
      setRating(5);
    } catch (err) {
      setError('Eroare: nu s-a putut trimite recenzia.');
    }
  };

  return (
    <div className="mt-10 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-white">Recenzii</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <textarea
            className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
            placeholder="Scrie o recenzie..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select
            className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[5, 4, 3, 2, 1].map((val) => (
              <option key={val} value={val}>
                {val} ⭐
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Trimite recenzia
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 mb-4">Autentifică-te pentru a adăuga o recenzie.</p>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Se încarcă recenziile...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Nu există recenzii încă.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-2 dark:border-gray-600">
              <p className="font-semibold text-blue-800 dark:text-blue-300">
                {review.user_username} • {review.rating}⭐
              </p>
              <p className="text-gray-700 dark:text-gray-200">{review.text}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
