import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

import "./register.css";
import Spinner from 'react-spinner-material';
import { MdClose } from 'react-icons/md';

export default function Register(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [termsError, setTermsError] = useState(null);

  async function register(e) {
    e.preventDefault();

    // VERIFICATION
    let anError = false;
    let errorInName = null;
    let errorInPassword = null;
    let errorInGender = null;
    let errorInBirth = null;
    let errorInTerms = null;

    // Name error
    if (name.trim().length <= 3) {
      errorInName = 'Por favor, insira seu nome de modo que tenha mais de 3 caracteres.';
      anError = true;
    }

    // Password Error
    if (password !== verifyPassword) {
      errorInPassword = 'As senha não são idênticas, por favor tentar novamente.';
      anError = true;
    }

    if (password.length === 0) {
      errorInPassword = errorInPassword === null ? 'Senha inválida' : errorInPassword + ' Senha inválida.';
      anError = true;
    }

    // Gender Error
    if (gender !== 'Masculino' && gender !== 'Feminino') {
      console.log(gender);
      errorInGender = 'Selecione seu sexo.';
      anError = true;
    }

    // Terms Error
    if (!terms) {
      errorInTerms = 'Você precisa aceitar os termos de uso e privacidade.';
      anError = true;
    }

    // Birth Error
    if (!birth) {
      errorInBirth = 'Por favor defina sua data de nascimento.';
      anError = true;
    }

    // If have an error
    if (anError) {
      setNameError(errorInName);
      setPasswordError(errorInPassword);
      setGenderError(errorInGender);
      setBirthError(errorInBirth);
      setTermsError(errorInTerms);
      return null;
    }

    setLoading(true);

    await firebase.register(email, password)
      .then(data => {

        const uid = data.user.uid;

        // Creata user in database
        firebase.database.ref('users').child(uid).set({
          name: name,
          email: email,
          birth: birth,
          gender: gender
        });

        firebase.sendVerification()
          .catch(error => alert('Send error: ' + error.code))
          .finally(() => {
            props.history.push('/home');
          });
      })
      .catch(error => alert('Error: ' + error));

    setLoading(false);

  }

  return (
    <div className="min-vh-100 w-100 d-flex center background-blue">
      <div className="container">

        <div className="title center">
          <h1>Login</h1>
          <p className="yellow">v1.0</p>
        </div>

        <div className="welcone center">
          <span>JUNTE-SE A NÓS</span>
          <p>Crie uma conta</p>
        </div>

        <div className="box-register">
          <form className="text-center" onSubmit={register}>

            {nameError && (
              <div className="formErrors">
                <div className="d-flex align-items-center justify-content-between">
                  {nameError}
                  <MdClose className="close-error" onClick={(e) => { setNameError(null) }} />
                </div>
              </div>
            )}
            <div className="form-group">
              <input onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Nome" required />
            </div>

            <div className="form-group">
              <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" required />
            </div>

            {passwordError && (
              <div className="formErrors">
                <div className="d-flex align-items-center justify-content-between">
                  {passwordError}
                  <MdClose className="close-error" onClick={(e) => { setPasswordError(null) }} />
                </div>
              </div>
            )}
            <div className="form-row">
              <div className="form-group col-md-6">
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Digite uma senha" required />
              </div>
              <div className="form-group col-md-6">
                <input onChange={e => setVerifyPassword(e.target.value)} type="password" className="form-control" placeholder="Digite sua senha novamente" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <input onChange={e => setBirth(e.target.value)} type="date" className="form-control" required />
                {birthError && (
                  <div className="formErrors">
                    <div className="d-flex align-items-center justify-content-between">
                      {birthError}
                      <MdClose className="close-error" onClick={(e) => { setBirthError(null) }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group col-md-6">
                <select onChange={e => setGender(e.target.value)} className="form-control" required>
                  <option value="">Selecione o sexo</option>
                  <option value="Masculino" >Masculino</option>
                  <option value="Feminino" >Feminino</option>
                </select>
                {genderError && (
                  <div className="formErrors">
                    <div className="d-flex align-items-center justify-content-between">
                      {genderError}
                      <MdClose className="close-error" onClick={(e) => { setGenderError(null) }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {termsError && (
              <div className="formErrors">
                <div className="d-flex align-items-center justify-content-between">
                  {termsError}
                  <MdClose className="close-error" onClick={(e) => { setTermsError(null) }} />
                </div>
              </div>
            )}
            <div className="form-check">
              <input onChange={e => setTerms(e.target.checked)} className="form-check-input" type="checkbox" id="gridCheck" required />
              <label className="form-check-label">
                Li e aceito os <Link to="/terms" className="registerLink yellow">termos de uso e privacidade</Link>
              </label>
            </div>
            <div className="CadBotao">
              <button type="submit" className="mt-3 btn background-yellow center" >{loading ? <Spinner size={20} spinnerColor={"#fff"} spinnerWidth={2} visible={true} /> : 'CADASTRAR'}</button>
            </div>
          </form>
        </div>

        <div className="copyright text-center">
          <p>Copyright© 2020 Todos os direitos reservados. Desenvolvido por WebProgrammersOfUganda©</p>
        </div>
      </div>
    </div>
  );
}
