import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { H1 } from './style';
import foto from '../../utils/img/foto.jpeg';

export default function Header() {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#037199' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <H1>Deep Fans</H1>
          </Typography>

          <h1>{userData.name}</h1>
          <img
            src="https://via.placeholder.com/40x40"
            alt="foto"
            width="40"
            height="40"
            style={{ borderRadius: 50, margin: 10 }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
