import * as React from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import api from '../../../../utils/Api/api';
import { CardText, Card } from './style';

export default function PublicationCard() {
  const [post, setPost] = React.useState(null); //post

  React.useEffect(() => {
    api.get('http://localhost:4000/post').then((response) => {
      setPost(response.data);
    });
  }, []);
  if (!post) return null; //caso não tsenha post retorna null

  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: 25 }}>
        {post.map((item) => (
          <>
            {item.url_media ? (
              <Card>
                <div>
                  <img
                    style={{ width: 465, height: 518, padding: 5 }}
                    src={item.url_media}
                    alt="foto"
                  />
                  <p style={{ margin: 10 }}>{item.text}</p>

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
            ) : (
              <CardText>
                <p style={{ marginTop: 5, padding: 10 }}>{item.text}</p>

                <IconButton aria-label="add to favorites">
                  <FavoriteIcon style={{ margin: 0 }} />
                </IconButton>
                <IconButton aria-label="share">
                  <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardText>
            )}
          </>
        ))}
      </div>
    </Container>
  );
}
