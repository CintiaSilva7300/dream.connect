import Container from '@mui/material/Container';
import Textarea from '@mui/joy/Textarea';
import * as React from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router';
import Files from 'react-files';
import ImageIcon from '@mui/icons-material/Image';

import api from '../../utils/Api/api';
import PublicationCard from './components/publicationCard/index';

export default function Publication() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [post, setPost] = React.useState(null); //post
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      console.log('-----> ', token);
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
  }, []);

  const navigate = useNavigate();

  const [text, setText] = useState();
  const [url_media, setUrl_media] = useState();

  const publication = (e) => {
    api
      .post('http://localhost:4000/post', {
        text,
        url_media: 'https://via.placeholder.com/465x518',
      })
      .then((response) => {
        if (response.data === false) {
          return;
        } else {
          navigate('/');
        }
      });
  };

  if (!userData) {
    return null; //caso não tenha post retorna null
  }

  const handleChange = (files) => {
    console.log(files);
  };

  const handleError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message);
  };

  return (
    <Container maxWidth="sm">
      <FormControl>
        <FormLabel style={{ marginTop: 10 }}>
          Faça uma publicação agora, {userData.name}{' '}
        </FormLabel>
        <Textarea
          onChange={(e) => setText(e.target.value)}
          color="neutral"
          style={{ marginTop: 10 }}
          placeholder="Type something here…"
          minRows={3}
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

              <div className="files">
                <Files
                  className="files-dropzone"
                  onChange={handleChange}
                  onError={handleError}
                  accepts={['image/png', '.pdf', 'audio/*', '.jpeg', '.mp4/*']}
                  multiple
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  <ImageIcon
                    style={{ cursor: 'pointer', marginTop: 8, color: '#000' }}
                  />
                </Files>
              </div>

              <Button onClick={publication} sx={{ ml: 'auto' }}>
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
