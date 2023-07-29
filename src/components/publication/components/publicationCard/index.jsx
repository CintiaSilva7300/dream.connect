import React from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import CommentModal from '../modalComment/index';
import BadgeAvatars from '../../../avatar/index';
import api from '../../../../utils/Api/api';
import { CardText } from './style';
import img from '../../../../utils/img/foto.jpeg';
import AccordionComment from '../../../accordionComment';
const url = 'http://localhost:4000';

export default function PublicationCard() {
  const [post, setPost] = React.useState(null); //get post

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
              <AccordionComment post={post} />
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
                  <BadgeAvatars />
                  <p
                    style={{
                      margin: 5,
                      fontFamily: 'sans-serif',
                      fontSize: 13,
                      fontWeight: 400,
                      color: '#037199',
                      cursor: 'pointer',
                    }}
                  >
                    {item.user.name}
                  </p>
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
              <AccordionComment />
            </CardText>
          )}
        </>
      ))}
    </Container>
  );
}
