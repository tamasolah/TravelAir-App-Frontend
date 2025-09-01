import React, { useEffect, useState } from "react";
import axios from "axios";

const Oferte = () => {
  const [oferte, setOferte] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/oferte/")
      .then((response) => {
        setOferte(response.data);
      })
      .catch((error) => {
        console.error("Eroare la preluarea ofertelor:", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista Oferte</h2>
      <ul>
        {oferte.map((oferta) => (
          <li key={oferta.id}>
            <strong>{oferta.titlu}</strong> - {oferta.descriere} - {oferta.pret} lei
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Oferte;
