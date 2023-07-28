import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Textarea from '@mui/joy/Textarea';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

import CommentModal from '../modalComment/index';
import BadgeAvatars from '../../../avatar/index';
import api from '../../../../utils/Api/api';
import { CardText, Card } from './style';
import img from '../../../../utils/img/foto.jpeg';
const url = 'http://localhost:4000';

const HoverModal = ({ open, handleClose, content, position }) => {
  const { x, y } = position;

  return (
    <Box
      sx={{
        display: open ? 'block' : 'none',
        position: 'absolute',
        top: y,
        left: x,
        zIndex: 9999,
      }}
    >
      <Paper sx={{ p: 2 }}>{content}</Paper>
    </Box>
  );
};

export default function PublicationCard() {
  const [post, setPost] = React.useState(null); //get post
  const [user, setUser] = React.useState(null); //get user
  const [isHovered, setIsHovered] = useState(false);

  const token = localStorage.getItem('token');
  // const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    api.get(`${url}/post`).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null; //caso não tsenha post retorna null

  return (
    <Container maxWidth="sm">
      {post.map((item) => (
        <>
          {item.url_media ? (
            <div
              style={{
                boxShadow: ' 0 8px 16px 0 rgba(0, 0, 0, 0.2)',
                marginTop: 10,
                width: 520,
              }}
            >
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#037199',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    marginTop: 10,
                    padding: 5,
                  }}
                >
                  <BadgeAvatars />
                  <p style={{ marginTop: 5, margin: 5, cursor: 'pointer' }}>
                    {item.user.name}
                  </p>
                </div>
              </div>
              <p
                style={{
                  margin: 5,
                  fontFamily: 'sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#037199',
                }}
              >
                {item.text}
              </p>
              <div>
                <img
                  style={{
                    width: 521,
                    height: 500,
                  }}
                  // src={item.url_media}
                  src={img}
                  alt="foto"
                />
              </div>
              <div>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon style={{ margin: 0 }} />
                </IconButton>
                <IconButton aria-label="share">
                  <CommentModal postCode={item.code} />
                  {/*<CommentModal post={item.code} />; passando informação para outro componente */}
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            <CardText>
              <div style={{ marginTop: 25 }}>
                <p style={{ borderColor: '#037199' }}>{item.text}</p>

                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
            </CardText>
          )}
        </>
      ))}
    </Container>
  );
}
