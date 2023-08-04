import React, { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import styles from './styles';
import api from '../../utils/Api/api';
import FormLogin from '../../components/formLogin';
import { Box, Marca, H1, Form, Card } from './styles';

export default function Login() {
  const [post, setPost] = useState();
  const url = 'http://localhost:4000';

  React.useEffect(() => {
    api.get(`${url}/post`).then((res) => {
      setPost(res.data);
    });
  }, []);

  return (
    <>
      <Box>
        <Marca>
          <H1>Dream Connect</H1>
        </Marca>
        <Form>
          <FormLogin />
        </Form>
      </Box>
      <div style={{ fontSize: 30, textAlign: 'center', marginTop: 50 }}>
        <h1 style={{ fontFamily: 'revert', fontWeight: 'bold' }}>
          Novidades em alta
        </h1>
      </div>
      <div style={styles.container}>
        <div class="main" id="scrollCard">
          <Card>
            <div>
              <img
                style={styles.img}
                src="https://instagram.fgru8-1.fna.fbcdn.net/v/t39.30808-6/336383242_766201328492004_2429714585709410062_n.jpg?stp=c0.190.720.900a_dst-jpg_e15&_nc_ht=instagram.fgru8-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Lv5AQbP_wIQAX8LmMPV&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzA2MTY1MTg5MjQwMTgwNTc5OA%3D%3D.2-ccb7-5&oh=00_AfA_s2PzD92jgylDYWp3dvK5KLjnd82XxyntZ5tBW-T96w&oe=64AD1E59&_nc_sid=ee9879"
                alt=""
              />
              <p style={{ margin: 10 }}>
                Hoje o dia foi produtivo!, fiz varios nadas.... :) Hoje o dia
                foi produtivo!, fiz varios nadas.... :)
              </p>

              <IconButton aria-label="add to favorites">
                <FavoriteIcon style={{ margin: 0 }} />
              </IconButton>
              <IconButton aria-label="share">
                <ChatBubbleIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
