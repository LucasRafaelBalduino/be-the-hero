import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const nogId = localStorage.getItem("nogId");
  const nogName = localStorage.getItem("nogName");

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: nogId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: nogId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [nogId]);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {nogName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
