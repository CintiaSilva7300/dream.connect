import * as React from 'react';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { H1 } from './styles';
import styles from './styles';
import { BLUE } from '../../utils/constants';
import AvatarHeader from '../avatarHeader/index';

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
      <AppBar position="static" style={{ backgroundColor: BLUE }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/" style={styles.a}>
              <H1>Dream Connect</H1>
            </a>
          </Typography>
          <h1>{userData.name}</h1>
          <AvatarHeader />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
