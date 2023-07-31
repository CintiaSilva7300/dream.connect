import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Header from '../../components/header';

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
      <Header />

      <p>{userData.name}</p>

      <div>
        <p>perfil</p>
      </div>
    </>
  );
}
