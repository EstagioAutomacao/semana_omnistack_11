import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar.');
    }
  }

  function handleLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="logo" />
        <span>Bem vinda, {ongName}!</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogOut}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>
        Casos cadastrados
      </h1>
      <ul>
        {
          incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
              <p>{ incident.title }</p>
            <strong>Descrição:</strong>
            <p>{ incident.description }</p>
            <strong>Valor:</strong>
            <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>
            <button type="button" onClick={() => handleDeleteIncident(incident.id)}><FiTrash2 color="#a8a8b3" size={28} /></button>
          </li>
          ))
        }
      </ul>
    </div>
  );
}
