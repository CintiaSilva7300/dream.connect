import * as React from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import styles from './styles';
import { API_PROD } from '../../utils/environments';
import { FONT } from '../../utils/constants';
import CardToPostUser from '../cardToPostUser';

export default function HeaderPerfil() {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodeToken = jwt_decode(token);
        setUserData(decodeToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserData(null);
      }
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container style={styles.container}>
        <div style={styles.box}>
          <img
            src={`${API_PROD}/file/${userData.image}`}
            alt=""
            srcset=""
            style={styles.img}
          />
          <p
            style={{
              marginTop: 200,
              padding: 10,
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 'bolder',
              color: '#696969',
            }}
          >
            {userData.name}
          </p>
        </div>

        <CardToPostUser />
      </Container>
    </>
  );
}
