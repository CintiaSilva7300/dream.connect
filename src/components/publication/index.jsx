import axios from 'axios';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Files from 'react-files';
import Menu from '@mui/joy/Menu';
import jwt_decode from 'jwt-decode';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import MenuItem from '@mui/joy/MenuItem';
import { useEffect, useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import Check from '@mui/icons-material/Check';
import FormControl from '@mui/joy/FormControl';
import Container from '@mui/material/Container';
import ImageIcon from '@mui/icons-material/Image';
import FormatBold from '@mui/icons-material/FormatBold';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatItalic from '@mui/icons-material/FormatItalic';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import api from '../../utils/Api/api';
import img from '../../utils/img/foto.jpeg';
import PublicationCard from './components/publicationCard/index';

export default function Publication() {
  const [text, setText] = useState();
  const [italic, setItalic] = React.useState(false);
  const token = localStorage.getItem('token');
  const [url_media, setUrl_media] = useState();
  const [post, setPost] = React.useState(null);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const url = 'http://localhost:4000';
  let fileUrl = 'http://localhost:4000/file/';

  useEffect(() => {
    api.get(`${url}/post`).then((response) => {
      setPost(response.data);
    });
    if (token) {
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
  }, []);

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    api
      .post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Arquivo enviado com sucesso:', response.data);
        setUrl_media(response.data.teste.id);
      })
      .catch((error) => {
        console.error('Erro ao enviar arquivo:', error);
      });
  };

  const handleFileChange = (e) => {
    handleFileUpload();
    setSelectedFile(e.target.files[0]);
  };

  const publication = () => {
    api
      .post(`${url}/post`, {
        text,
        url_media,
      })
      .then((response) => {
        if (response.data === false) {
          return;
        } else {
          handleFileUpload();
          // return window.location.reload();
        }
      });
  };

  if (!post) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
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
          Carregando
        </h1>
      </div>
    );
  }

  if (!userData) {
    return null; //caso não tenha post retorna null
  }

  return (
    <Container maxWidth="sm">
      <FormControl>
        <p
          style={{
            marginTop: 10,
            fontSize: 22,
            fontFamily: 'sans-serif',
            fontWeight: 400,
            color: '#037199',
            textAlign: 'center',
          }}
        >
          Faça uma publicação agora, {userData.name}{' '}
        </p>

        <Textarea
          style={{
            borderColor: '#037199',
            margin: 20,
            height: 150,
            width: '95%',
          }}
          onChange={(e) => setText(e.target.value)}
          placeholder="Diga como está seu dia..."
          minRows={3}
          startDecorator={
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <a href="/perfil">
                <img
                  style={{
                    padding: 5,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                  }}
                  src={`${fileUrl}${userData.image}`}
                  alt="foto"
                />
              </a>
            </Box>
          }
          endDecorator={
            <Box
              sx={{
                display: 'flex',
                gap: 'var(--Textarea-paddingBlock)',
                pt: 'var(--Textarea-paddingBlock)',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto',
              }}
            >
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
                sx={{ '--ListItemDecorator-size': '24px' }}
              >
                {['200', 'normal', 'bold'].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight);
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>
                      {fontWeight === weight && <Check fontSize="sm" />}
                    </ListItemDecorator>
                    {weight === '200' ? 'lighter' : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? 'soft' : 'plain'}
                color={italic ? 'primary' : 'neutral'}
                aria-pressed={italic}
                onClick={() => setItalic((bool) => !bool)}
              >
                <FormatItalic />
              </IconButton>

              <div>
                <input
                  style={{ width: 135 }}
                  onChange={handleFileChange}
                  type="file"
                  id="teste"
                ></input>
                <label for="teste" class="btnPerson" style={{ margin: 5 }}>
                  Escolha imagem
                </label>
              </div>

              <Button
                onClick={publication}
                sx={{ ml: 'auto' }}
                style={{
                  backgroundColor: '#037199',
                  width: 100,
                  height: 20,
                  borderRadius: 20,
                }}
              >
                Publicar
              </Button>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight,
            fontStyle: italic ? 'italic' : 'initial',
          }}
        />
      </FormControl>

      <div style={{ marginTop: 25 }}>
        <PublicationCard />
      </div>
    </Container>
  );
}
