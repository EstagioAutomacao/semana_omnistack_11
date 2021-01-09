import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      if (response.data.length > 0) {
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data[0].name);
        history.push('/profile');
        return false;
      }
      alert('Esse id não existe, tente novamente!')
    } catch (err) {
      alert('Esse id não existe, tente novamente!')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input type="text" placeholder="Sua ID" onChange={e => setId(e.target.value)} />
          <button type="submit" className="button">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size="16" color="e02041" />
            Não tenho cadastro.</Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  )  
}

export default Logon;
