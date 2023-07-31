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

import api from '../../utils/Api/api';

export default function FormLogin() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginUser = (e) => {
    api
      .post('http://localhost:4000/user/login', {
        password,
        email,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        if (response.data === false) {
          navigate('/home');
        } else {
          navigate('/');
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
      <h1>Fazer login</h1>

      <TextField
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
        variant="outlined"
        autocomplete="off"
        style={{ width: '50%', margin: 10 }}
      />

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

      <Button
        onClick={loginUser}
        variant="contained"
        style={{
          backgroundColor: '#037199',
          width: '50%',
          margin: 10,
          height: 50,
          borderRadius: 20,
        }}
      >
        Entrar
      </Button>
      <a href="/signup" style={{ color: '#037199' }}>
        Não tem conta?
      </a>
    </div>
  );
}
