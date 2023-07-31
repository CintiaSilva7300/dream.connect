import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Files from 'react-files';
import ImageIcon from '@mui/icons-material/Image';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import api from '../../../../utils/Api/api';
const url = 'http://localhost:4000';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 1,
  bgcolor: 'background.paper',
  p: 4,
};

export default function CommentModalChild({ postCode }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState(null);
  const [textInput, setTextInput] = React.useState('');
  const [url_media, setUrl_media] = useState();
  const token = localStorage.getItem('token');
  const [text, setText] = useState();

  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
  }, []);

  const addEmoji = (emoji) => () => setTextInput(`${textInput}${emoji}`);

  const handleChangeValue = (e) => {
    setText(e.target.value);
    setTextInput(e.target.value);
  };

  const comment = () => {
    api
      .post(`${url}/comment/`, {
        url_media: 'https://via.placeholder.com/465x518',
        postCode: postCode,
        text,
      })
      .then((response) => {
        window.location.reload();
        if (response.data === false) {
          return response;
        }
      });
  };

  return (
    <>
      <ChatBubbleIcon onClick={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade
          in={open}
          sx={style}
          style={{ backgroundColor: '#fff', borderRadius: 10, height: 170 }}
        >
          <Box style={{ width: 450 }}>
            <Textarea
              onChange={handleChangeValue}
              id="transition-modal-title"
              placeholder="Type in here…"
              value={textInput}
              minRows={2}
              maxRows={4}
              startDecorator={
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji('👍')}
                  >
                    👍
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji('🏖')}
                  >
                    🏖
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji('😍')}
                  >
                    😍
                  </IconButton>

                  <Files
                    onClick={(e) => setUrl_media(e.target.value)}
                    style={{ cursor: 'pointer', marginTop: 10 }}
                    className="files-dropzone"
                    accepts={[
                      'image/png',
                      '.pdf',
                      'audio/*',
                      '.jpeg',
                      '.mp4/*',
                    ]}
                    multiple
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                  >
                    <ImageIcon
                      style={{ cursor: 'pointer', marginTop: 8, color: '#000' }}
                    />
                  </Files>
                </Box>
              }
              endDecorator={
                <Typography level="body3" sx={{ ml: 'auto' }}>
                  {textInput.length} character(s)
                </Typography>
              }
              sx={{ minWidth: 300 }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClickCapture={handleClose}
                onClick={comment}
                style={{
                  backgroundColor: '#037199',
                  width: 200,
                  borderRadius: 20,
                  margin: 6,
                  padding: 5,
                }}
              >
                comentar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
