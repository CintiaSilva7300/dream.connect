import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { Box, Marca, H1, Form, Card } from './style';
import FormLogin from '../../components/formLogin/FormLogin';

// import Icon from '../../utils/img/icons.png'

export default function Login() {
  return (
    <>
      <Box>
        <Marca>
          <H1>Deep Fans</H1>
          {/* <img src={Icon} alt='Logo' style={{width: 100, height:100, margin:20}}/> */}
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
        <Card>
          {/* <h1>SEILA</h1> */}
          <div>
            <img
              style={{ width: 465, height: 518, padding: 5 }}
              src="https://instagram.fgru8-1.fna.fbcdn.net/v/t39.30808-6/336383242_766201328492004_2429714585709410062_n.jpg?stp=c0.190.720.900a_dst-jpg_e15&_nc_ht=instagram.fgru8-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Lv5AQbP_wIQAX8LmMPV&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzA2MTY1MTg5MjQwMTgwNTc5OA%3D%3D.2-ccb7-5&oh=00_AfA_s2PzD92jgylDYWp3dvK5KLjnd82XxyntZ5tBW-T96w&oe=64AD1E59&_nc_sid=ee9879"
              alt=""
            />
            <p style={{ margin: 10 }}>
              Hoje o dia foi produtivo!, fiz varios nadas.... :) Hoje o dia foi
              produtivo!, fiz varios nadas.... :)
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

        <Card>
          {/* <h1>SEILA</h1> */}
          <div>
            <img
              style={{ width: 465, height: 518, padding: 5 }}
              src="https://instagram.fgru8-1.fna.fbcdn.net/v/t39.30808-6/297855034_1259355631537214_4425380830730833499_n.jpg?stp=c0.190.720.900a_dst-jpg_e15&_nc_ht=instagram.fgru8-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=9yO4sEKO8rYAX_XjryG&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=Mjg5ODg3NDI3NTcwNjQ0Njc4OQ%3D%3D.2-ccb7-5&oh=00_AfA0K66Uw04YwCqf3M4nfQnx4JtEG0kEin8oH61J4DWCFA&oe=64AC63B3&_nc_sid=b41fef"
              alt=""
            />
            <p style={{ margin: 10 }}>
              Hoje o dia foi produtivo!, fiz varios nadas.... :) Hoje o dia foi
              produtivo!, fiz varios nadas.... :)
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

        <Card>
          {/* <h1>SEILA</h1> */}
          <div>
            <img
              style={{ width: 465, height: 518, padding: 5 }}
              src="https://instagram.fgru8-1.fna.fbcdn.net/v/t39.30808-6/341171444_188538910222991_299348645046001599_n.jpg?stp=c0.190.720.900a_dst-jpg_e15&_nc_ht=instagram.fgru8-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=H-AmVgr2pDQAX9eu55j&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzA4MjU0NjM3NDU5MTU2NzczMg%3D%3D.2-ccb7-5&oh=00_AfDlLSNo5B2IO8W9fzq1QQnKkFlhZLx8n_GL5PNozNc9bA&oe=64AD3F16&_nc_sid=ee9879"
              alt=""
            />
            <p style={{ margin: 10 }}>
              Hoje o dia foi produtivo!, fiz varios nadas.... :) Hoje o dia foi
              produtivo!, fiz varios nadas.... :)
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
    </>
  );
}
