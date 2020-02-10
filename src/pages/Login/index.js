import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

import Spinner from 'react-spinner-material';
import './login.css';

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Aniload, setAniload] = useState('ACESSAR');

  function handleSub() {
    setAniload(<Spinner size={20} spinnerColor={"#fff"} spinnerWidth={2} visible={true} />);
  }

  useEffect(() => {
    window.setTimeout(() => {
      setAniload('ACESSAR')
    }, 1500);
  }, [Aniload]);


  function login(e) {
    e.preventDefault();
    
    firebase.login(email, password)
    .then(data => {

      props.history.push('home');
    })
    .catch(error => {
      //console.log(error)
      alert(error.message);
    })
  }



  return (
    <div className="container min-vh-100 min-vw-100 d-flex center background-blue">

      <div className="title center">
        <h1>CTRL F</h1>
        <p className="yellow">v. PEANUT</p>
      </div>

      <div className="box-login center">
        <h2>Entre com sua conta</h2>
        <form onSubmit={login} className="form-login center">
          <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required spellCheck="false" />
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" required spellCheck="false" />

          <button type="submit" className="btn background-yellow" onClick={handleSub}>{Aniload}</button>
        </form>
        <p>Não tem uma conta? <Link to="register" className="registerLink yellow">Clique aqui</Link></p>
      </div>

      <div className="copyright">
        <p>Copyright© 2020 Todos os direitos reservados. Desenvolvido por WebProgrammersOfUganda©</p>
      </div>
    </div>
  );
}
