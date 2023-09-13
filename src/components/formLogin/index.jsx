import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router";
import { useState } from "react";

import styles from "./styles";
import api from "../../utils/Api/api";
import MyButton from "../basicComponents/CustomButton";
import CustomTextField from "../basicComponents/CustomTextField";

export default function FormLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = (e) => {
    api
      .post("/user/login", {
        password,
        email,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        if (response.data === false) {
          navigate("/login");
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div style={styles.container}>
      <h1>Fazer login</h1>

      <CustomTextField
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
      />

      <FormControl sx={{ m: 1, width: "50%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
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

      <MyButton onClick={loginUser}>Entrar</MyButton>

      <a href="/signup" style={styles.a}>
        Não tem conta?
      </a>
    </div>
  );
}
