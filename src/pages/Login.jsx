import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("Completează toate câmpurile.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Adresa de email nu este validă.");
      return;
    }

    try {
      await login({ username, email, password }); 
      navigate("/acasa");
    } catch (err) {
      setError("Eroare la autentificare: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-400">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Autentificare TravelAir
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Parolă"
              className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Autentificare
          </button>
        </form>
      </div>
    </div>
  );
}
