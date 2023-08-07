import React, { useState } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './styles';
import { CardText } from './styles';
import api from '../../../../utils/Api/api';
import AvatarIcon from '../../../avatar/index';
import CommentModal from '../modalComment/index';
import AccordionComment from '../../../accordionComment';

const url = 'http://localhost:4000';

export default function PublicationCard({ posts }) {
  if (!posts) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress style={{ width: 70, height: 70, color: '#037199' }} />
        <h1
          style={{
            fontSize: 30,
            fontFamily: 'cursive',
            fontWeight: 700,
            color: '#037199',
            margin: 10,
          }}
        >
          Carregando...
        </h1>
      </div>
    );
  }

  return (
    <Container maxWidth="sm">
      {posts.map((item) => (
        <>
          {item.url_media ? (
            <div style={styles.box}>
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
                  <AvatarIcon />
                  <p style={{ marginTop: 5, margin: 5, cursor: 'pointer' }}>
                    {item.user.name}
                  </p>
                </div>
              </div>
              <p style={styles.text}>{item.text}</p>
              <div>
                <img
                  style={{ width: 521, height: 500 }}
                  src={`http://localhost:4000/file/${item.url_media}`}
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
              <AccordionComment post={item} />
            </div>
          ) : (
            <CardText>
              <div style={{ marginTop: 25 }}>
                <div
                  style={{
                    display: 'flex',
                    marginTop: 10,
                    padding: 5,
                  }}
                >
                  <AvatarIcon />
                  <p style={styles.nameText}>{item.user.name}</p>
                </div>
                <p style={styles.conteudoText}>{item.text}</p>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <CommentModal postCode={item.code} />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
              <AccordionComment post={item} />
            </CardText>
          )}
        </>
      ))}
    </Container>
  );
}
