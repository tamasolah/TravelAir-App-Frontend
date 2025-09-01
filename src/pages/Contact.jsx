import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:8000";

export default function Contact() {
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    name: user?.username || "",
    email: user?.email || "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await fetch(`${API}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.detail || "Nu s-a putut trimite mesajul.");

      setStatus({ loading: false, ok: true, msg: data?.detail || "Mesajul a fost salvat. Îți mulțumim!" });

      setForm((f) => ({ ...f, subject: "", message: "" }));
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-100 mb-8"
        >
          Contactează-ne
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card info stânga */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700 p-6 shadow"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 dark:text-blue-300 text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100">Adresă</div>
                  <div className="text-gray-600 dark:text-gray-400">Str. Ion Creangă 1, București</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 dark:text-blue-300 text-xl">
                  <FaPhoneAlt />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100">Telefon</div>
                  <div className="text-gray-600 dark:text-gray-400">+40 312 345 678</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 dark:text-blue-300 text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100">Email</div>
                  <div className="text-gray-600 dark:text-gray-400">support@travelair.ro</div>
                </div>
              </div>
              <div className="pt-2">
                <iframe
                  title="Harta"
                  className="rounded-xl w-full h-48 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.836!2d26.102!3d44.439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z44KkIDQ0wrAyNSczOS4wIk4gMjbCsDA2JzA3LjQiRQ!5e0!3m2!1sro!2sro!4v1680000000000"
                />
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-white/50 dark:border-gray-700 p-6 md:p-8 shadow"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Nume</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Telefon</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full rounded-xl border p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Subiect</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full rounded-xl border p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Mesaj</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={6}
                  required
                  className="w-full rounded-xl border p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className={`text-sm ${status.ok === false ? "text-red-600" : "text-green-700"}`}>
                {status.msg}
              </div>
              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
              >
                <FaPaperPlane />
                {status.loading ? "Se trimite..." : "Trimite mesajul"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
