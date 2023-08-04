import * as React from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

import styles from './styles';
import Header from '../../components/header';
import HeaderPerfil from '../../components/headerPerfil';

export default function Perfil() {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
  }, []);

  if (!userData) {
    return <p>...</p>;
  }

  return (
    <>
      <div>
        <Header />
        <HeaderPerfil />
      </div>
    </>
  );
}
