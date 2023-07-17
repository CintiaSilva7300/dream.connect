import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import api from '../../utils/Api/api';

export default function FormLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setPasswordConfirm] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [secondName, setSecondName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [genre, setGenre] = useState();
  const [birthDate, setBirthDate] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const loginUser = (e) => {
    api
      .post('http://localhost:4000/user', {
        name,
        secondName,
        email,
        telephone,
        genre,
        birthDate,
        password,
        confirmPassword,
      })
      .then((response) => {
        console.log('response --> ', response);
        localStorage.setItem('token', response.data.token);
        if (response.data === false) {
          navigate('/login');
        } else {
          navigate('/');
          console.log('response.data --> ', response);
        }
      });
  };

  return (
    <div
      className="divContainer"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vh',
      }}
    >
      <h1
        style={{
          fontSize: 22,
          fontFamily: 'sans-serif',
          fontWeight: 400,
          color: '#037199',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Faça parte da comunidade com seus <strong>"FANS"</strong> !
      </h1>
      {/* <h1 style={{ fontSize: 20, margin: 10 }}>Criar conta</h1> */}

      <TextField
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
        autocomplete="off"
        style={{ width: '50%', margin: 10 }}
      />

      <TextField
        onChange={(e) => setSecondName(e.target.value)}
        label="Second Name"
        variant="outlined"
        autocomplete="off"
        style={{ width: '50%', margin: 10 }}
      />

      <TextField
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
        variant="outlined"
        autocomplete="off"
        style={{ width: '50%', margin: 10 }}
      />

      <TextField
        onChange={(e) => setTelephone(e.target.value)}
        label="Telephone"
        variant="outlined"
        autocomplete="off"
        style={{ width: '50%', margin: 10 }}
      />
      <TextField
        onChange={(e) => setGenre(e.target.value)}
        label="Genre"
        variant="outlined"
        autocomplete="off"
        style={{ width: '50%', margin: 10 }}
      />

      <div style={{ width: '50%', margin: 10 }}>
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

      <Button
        onClick={loginUser}
        variant="contained"
        style={{
          backgroundColor: 'c',
          width: '50%',
          margin: 10,
          height: 50,
          borderRadius: 20,
        }}
      >
        Cadastrar-se
      </Button>
      <a style={{ color: '#037199' }} href="/login">
        Ja possui conta?
      </a>
    </div>
  );
}
