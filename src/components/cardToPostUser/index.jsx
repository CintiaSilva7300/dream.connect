import * as React from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccordionComment from '../accordionComment';

import styles from './styles';
import AvatarIcon from '../avatar';
import { CardText } from './styles';
import api from '../../utils/Api/api';
import img from '../../utils/img/foto.jpeg';
import CommentModal from '../publication/components/modalComment';

const url = 'http://localhost:4000';

export default function CardToPostUser() {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  const [post, setPost] = React.useState(null);

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

    api
      .get(`${url}/post`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  if (!userData || post === null) {
    return <p>Loading...</p>;
  }

  const filteredPostsToUser = post.filter(
    (singlePost) => singlePost.user.email === userData.email
  );

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: 100 }}>
        {filteredPostsToUser.map((item) => (
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
    </>
  );
}
