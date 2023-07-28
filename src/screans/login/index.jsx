import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import setaIcon from '../../utils/img/iconsSeta.png';
import { Box, Marca, H1, Form, Card, Div } from './style';
import FormLogin from '../../components/formLogin/FormLogin';
import api from '../../utils/Api/api';

export default function Login() {
  const [text, setText] = useState();
  const [url_media, setUrl_media] = useState();
  const [post, setPost] = useState();
  const url = 'http://localhost:4000';

  React.useEffect(() => {
    api.get(`${url}/post`).then((res) => {
      setPost(res.data);
      // console.log(res.data);
    });
  }, []);

  return (
    <>
      <Box>
        <Marca>
          <H1>Deep Many</H1>
          {/* <img src={Icon} alt='Logo' style={{width: 100, height:100, margin:20}}/> */}
          {/* <Div class="main" id="section1">
            <a href="#scrollCard" style={{ marginLeft: 166 }}>
              <img
                src={setaIcon}
                alt="seta"
                style={{ marginTop: '95vh', height: 50, width: 50 }}
              />
            </a>
          </Div> */}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div class="main" id="scrollCard">
          {/* {post.map((p) => (
            <p>aaaaaa{p.name}</p>
          ))} */}
          <Card>
            <div>
              <img
                style={{ width: 465, height: 518, padding: 5 }}
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
