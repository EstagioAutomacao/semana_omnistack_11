import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
      history.push('/profile');
      alert('Cadastrado com sucesso!');
    } catch (err) {
      alert('Error ao cadastrar!');
    }
  }
  return (
    <div className="new-incidents-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo" />
          <h1>Cadastrar novo caso</h1>
          <p>Faça o cadastro do caso.</p>
          <Link to="/profile" className="back-link">
              <FiArrowLeft size="16" color="e02041" />
              Voltar</Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text" placeholder="Título do caso" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea type="email" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="text" placeholder="Valor em Reais" value={value} onChange={(e) => setValue(e.target.value)} />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
