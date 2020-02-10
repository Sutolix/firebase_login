import React, { useState, useEffect } from 'react';
import firebase from '../../services/firebase';
import { Link } from 'react-router-dom';

export default function Home(props) {

  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    birth: '',
    emailVerified: '',
    isLoaded: false
  });

  useEffect(() => {    
    firebase.liveUser((user) => {
      if(user) {

        firebase.getUserInformations(snapshot => {
          setUser({
            name: snapshot.val().name,
            email: snapshot.val().email,
            gender: snapshot.val().gender,
            birth: snapshot.val().birth,
            emailVerified: firebase.isVerified(),
            isLoaded: true
          });
        });

      } else {
        setUser({
          name: '',
          email: '',
          gender: '',
          birth: '',
          emailVerified: '',
          isLoaded: true
        });
      }

    });
  }, []);

  return (
    <div className="text-primary">
      <h1>
        CTRL F
      </h1>

      {!user.isLoaded ?
      (
        <h6>Carregando</h6>
      ) 
      :
      (
      <div>
        {
          user.name !== '' ?
        (
          <>
            <h4>
              <b>Nome:</b> {user.name}
            </h4>
            <h4>
              <b>Email verificado? </b> { user.emailVerified ? 'sim' : 'não' }
            </h4>
            <button type="button" onClick={ firebase.logout } className="btn btn-sm btn-danger">Sair</button>
          </>
        )
        :
        (
          <>
            <h4>Não há usuário logado</h4>
            <Link to="/login" className="btn btn-sm btn-primary mr-1">Acessar</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Registrar</Link>
          </>
        )
        }
      </div>
      )
      }
    </div>
  );
}
