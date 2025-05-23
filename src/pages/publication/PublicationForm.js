import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';
import axios from 'axios';

// Appwrite config
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('67bb24ad002378e79e38');

const account = new Account(client);

const PublicationForm = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    account.get()
      .then(async u => {
        setUser(u);

        // Envoyer UID au backend pour l’enregistrer
        await axios.post('http://localhost:3000/auth/register', {
          uid: u.$id,
          email: u.email
        });
      })
      .catch(() => setUser(null));
  }, []);

  const loginWithGoogle = () => {
    account.createOAuth2Session('google', 'http://localhost:5173/publication');
  };

  const logout = () => {
    account.deleteSession('current').then(() => {
      setUser(null);
      window.location.reload();
    });
  };

  return (
    <div>
      {!user ? (
        <button onClick={loginWithGoogle}>Se connecter avec Google</button>
      ) : (
        <>
          <p>Bienvenue {user.email}</p>
          <button onClick={logout}>Se déconnecter</button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default PublicationForm;
