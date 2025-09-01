import React, { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import OfertaCard from "./OfertaCard";
import { useAuth } from "../context/AuthContext";

const transportOptions = ["Autocar", "Avion", "Tren", "Vapor"];
const pretOptions = ["<1000", "1000-3000", ">3000"];
const ratingOptions = ["5", "4", "3"];

export default function OffersList() {
  const { token } = useAuth();
  const [oferte, setOferte] = useState([]);
  const [filteredOferte, setFilteredOferte] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState([]);
  const [selectedPret, setSelectedPret] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);

  useEffect(() => {
    const fetchOferte = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/oferte/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Eroare la fetch oferte:", errorData);
          return;
        }

        const data = await response.json();

        const oferteArray = Array.isArray(data.results)
          ? data.results
          : Array.isArray(data)
          ? data
          : [];

        setOferte(oferteArray);
        setFilteredOferte(oferteArray);
      } catch (error) {
        console.error("Eroare la fetch oferte:", error);
      }
    };

    if (token) {
      fetchOferte();
    }
  }, [token]);

  useEffect(() => {
    let filtrate = [...oferte];

    if (selectedTransport.length > 0) {
      filtrate = filtrate.filter((oferta) =>
        selectedTransport.includes(oferta.transport)
      );
    }

    if (selectedPret.length > 0) {
      filtrate = filtrate.filter((oferta) => {
        return selectedPret.some((range) => {
          if (range === "<1000") return oferta.pret < 1000;
          if (range === "1000-3000") return oferta.pret >= 1000 && oferta.pret <= 3000;
          if (range === ">3000") return oferta.pret > 3000;
          return false;
        });
      });
    }

    if (selectedRating.length > 0) {
      filtrate = filtrate.filter((oferta) =>
        selectedRating.includes(oferta.rating?.toString())
      );
    }

    setFilteredOferte(filtrate);
  }, [selectedTransport, selectedPret, selectedRating, oferte]);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Filtru oferte</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-4">
        <Listbox value={selectedTransport} onChange={setSelectedTransport} multiple>
          <div className="relative">
            <Listbox.Button className="w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-800 dark:text-white shadow">
              {selectedTransport.length > 0
                ? selectedTransport.join(", ")
                : "Filtrează după transport"}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-60 overflow-auto z-10">
              {transportOptions.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : "text-gray-900 dark:text-white"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className="flex justify-between">
                      {option}
                      {selected && <CheckIcon className="w-4 h-4 text-blue-600" />}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <Listbox value={selectedPret} onChange={setSelectedPret} multiple>
          <div className="relative">
            <Listbox.Button className="w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-800 dark:text-white shadow">
              {selectedPret.length > 0 ? selectedPret.join(", ") : "Filtrează după preț"}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-60 overflow-auto z-10">
              {pretOptions.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : "text-gray-900 dark:text-white"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className="flex justify-between">
                      {option}
                      {selected && <CheckIcon className="w-4 h-4 text-blue-600" />}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <Listbox value={selectedRating} onChange={setSelectedRating} multiple>
          <div className="relative">
            <Listbox.Button className="w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-800 dark:text-white shadow">
              {selectedRating.length > 0
                ? selectedRating.map((r) => `${r}⭐`).join(", ")
                : "Filtrează după rating"}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-60 overflow-auto z-10">
              {ratingOptions.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : "text-gray-900 dark:text-white"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className="flex justify-between">
                      {option}⭐
                      {selected && <CheckIcon className="w-4 h-4 text-blue-600" />}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={() => {
            setSelectedTransport([]);
            setSelectedPret([]);
            setSelectedRating([]);
          }}
          className="text-blue-600 dark:text-blue-300 hover:underline text-sm"
        >
          Resetează toate filtrele
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {Array.isArray(filteredOferte) && filteredOferte.length > 0 ? (
          filteredOferte.map((oferta) => (
            <OfertaCard key={oferta.id} oferta={oferta} />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Nu există oferte disponibile.</p>
        )}
      </div>
    </div>
  );
}