import React from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './styles';
import { CardText } from './styles';
import api from '../../../../utils/Api/api';
import AvatarIcon from '../../../avatar/index';
import CommentModal from '../modalComment/index';
import img from '../../../../utils/img/foto.jpeg';
import AccordionComment from '../../../accordionComment';
import { json } from 'react-router';

const url = 'http://localhost:4000';

export default function PublicationCard() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    api.get(`${url}/post`).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <Container maxWidth="sm">
      {post.map((item) => (
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
