import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import api from '../../utils/Api/api';
import styles from './styles';
import { BLUE } from '../../utils/constants';

const currencies = [
  {
    value: 'Feminino',
    label: 'Feminino',
  },
  {
    value: 'Masculino',
    label: 'Masculino',
  },
  {
    value: 'Não-Binário',
    label: 'Não-Binário',
  },
  {
    value: 'Cisgênero',
    label: 'Cisgênero',
  },
];

export default function FormSigNup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setPasswordConfirm] = React.useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [secondName, setSecondName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [genre, setGenre] = useState();
  const [image, setImage] = useState();
  const [birthDate, setBirthDate] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const loginUser = (e) => {
    try {
      api
        .post('/user', {
          name,
          secondName,
          email,
          telephone,
          genre,
          birthDate,
          image,
          password,
          confirmPassword,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          console.log(response);
          if (response.data === false) {
            navigate('/login');
          } else {
            handleFileUpload();
            navigate('/');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    api
      .post('/file/upload', formData)
      .then((response) => {
        console.log('Arquivo enviado com sucesso:', response.data);
        setImage(response.data.teste.id);
      })
      .catch((error) => {
        console.error('Erro ao enviar arquivo:', error);
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    handleFileUpload(e.target.files[0]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Venha fazer parte da comunidade, <strong>CONECTE-SE</strong>
      </h1>

      <TextField
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
        autocomplete="off"
        style={styles.textField}
      />

      <TextField
        onChange={(e) => setSecondName(e.target.value)}
        label="Second Name"
        variant="outlined"
        autocomplete="off"
        style={styles.textField}
      />

      <div
        style={{
          border: '1px solid #bebebe',
          padding: 0,
          height: 50,
          width: '50%',
          borderRadius: 3,
        }}
      >
        <input
          style={{ width: 138, marginTop: 12, padding: 1 }}
          onChange={handleFileChange}
          type="file"
          id="teste"
        />
        <label for="teste" class="btnPerson" style={{ margin: 5 }}>
          Escolha imagem
        </label>
      </div>

      <TextField
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
        variant="outlined"
        autocomplete="off"
        style={styles.textField}
      />

      <TextField
        onChange={(e) => setTelephone(e.target.value)}
        label="Telephone"
        variant="outlined"
        autocomplete="off"
        style={styles.textField}
        type="number"
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 11);
        }}
      />

      <TextField
        onChange={(e) => setGenre(e.target.value)}
        autocomplete="off"
        style={styles.textField}
        id="outlined-select-currency"
        select
        label="Genre"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <div style={styles.date}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            onChange={(e) => setBirthDate(e)}
            className="fullwidth"
            format="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </div>

      <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="outlined-adornment-password"
          type={showPasswordConfirm ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPasswordConfirm}
                onMouseDown={handleMouseDownPasswordConfirm}
                edge="end"
              >
                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
      </FormControl>

      <Button onClick={loginUser} variant="contained" style={styles.button}>
        Cadastrar-se
      </Button>
      <a style={{ color: BLUE }} href="/login">
        Ja possui conta?
      </a>
    </div>
  );
}
