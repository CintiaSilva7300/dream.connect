import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FacebookLogin from "react-facebook-login";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import FacebookIcon from "@mui/icons-material/Facebook";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router";
import { useState } from "react";

import styles from "./styles";
import api from "../../utils/Api/api";
import CustomButton from "../basicComponents/CustomButton";
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
  let file;

  const responseFacebook = (response) => {
    console.log("Dados do Facebook:", response);
    if (response.status !== "unknown") {
      sendFacebookDataToBackend(response);
    } else {
      console.log("Login do Facebook não foi autorizado.");
    }
  };

  const sendFacebookDataToBackend = (facebookData) => {
    const profilePictureUrl = facebookData.picture.data.url;

    // if (facebookData) {
    //   return alert("Autenticação esta em faze de implementação");
    // }

    fetch(profilePictureUrl)
      .then((response) => response.arrayBuffer())
      .catch((error) => {
        console.error("Erro ao baixar a imagem de perfil:", error);
      });

    file = facebookData.picture.data.url;

    api
      .post("/user", {
        email: facebookData.email,
        password: facebookData.accessToken,
        confirmPassword: facebookData.accessToken,
        name: facebookData.name,
        image: file,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        if (response.data === false) {
          console.log("teste", response.data);
          navigate("/login");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(
          "Erro ao enviar dados do Facebook para o backend:",
          error
        );
      });
  };

  const componentClicked = (data) => {
    console.warn(data);
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

  const hrStyle = {
    marginBottom: 1,
    backgroundColor: "#03658c",
    height: 1,
    width: 450,
    margin: "0 10px",
  };

  const textStyle = {
    display: "inline-block",
    fontWeight: "bold",
    padding: 5,
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
      <CustomButton onClick={loginUser}>Entrar</CustomButton>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        <hr style={hrStyle} />
        <span style={textStyle}>ou logar com</span>
        <hr style={hrStyle} />
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <FacebookLogin
          appId="705852731540516"
          autoLoad={true}
          fields="name,email,picture"
          textButton={
            <FacebookIcon
              style={{ color: "#1976d2", fontSize: 50, cursor: "pointer" }}
            />
          }
          onClick={componentClicked}
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
        />
      </div>

      <a href="/signup" style={styles.a}>
        Não tem conta?
      </a>

      {/* <img src={file} alt="Profile Picture" width="50" height="100" /> */}
    </div>
  );
}
