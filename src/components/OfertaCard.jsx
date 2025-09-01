import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaBed, FaBus, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OfertaCard = ({ oferta }) => {
  return (
    <Link to={`/oferta/${oferta.id}`} className="block">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-[300px] min-h-[500px] flex flex-col justify-between hover:shadow-2xl transition">
        <img
          src={new URL(oferta.imagine, 'http://localhost:8000/media/').href}
          alt={oferta.titlu}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">{oferta.titlu}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-4">
            {oferta.descriere}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Destinație: {oferta.destinatie}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Durată: {oferta.durata}</p>

          <div className="flex items-center gap-2 text-yellow-500">
            <FaStar /> <span className="text-sm">{oferta.rating}/5</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FaBus /> {oferta.transport}
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FaBed /> {oferta.tip_cazare}
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FaUsers /> {oferta.numar_locuri} locuri disponibile
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            Facilități: {oferta.facilitati}
          </div>

          <div className={`flex items-center gap-2 ${oferta.disponibilitate ? 'text-green-600' : 'text-red-600'}`}>
            {oferta.disponibilitate ? <FaCheckCircle /> : <FaTimesCircle />}
            {oferta.disponibilitate ? "Disponibil" : "Indisponibil"}
          </div>

          <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 mt-4">
            De la {parseFloat(oferta.pret).toFixed(2)}€
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OfertaCard;

