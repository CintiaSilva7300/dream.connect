import * as React from "react";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import styles from "./styles";
import api from "../../utils/Api/api";
import { BLUE } from "../../utils/constants";
import CustomButton from "../basicComponents/CustomButton";
import CustomTextField from "../basicComponents/CustomTextField";

const currencies = [
  {
    value: "Feminino",
    label: "Feminino",
  },
  {
    value: "Masculino",
    label: "Masculino",
  },
  {
    value: "Não-Binário",
    label: "Não-Binário",
  },
  {
    value: "Cisgênero",
    label: "Cisgênero",
  },
];

export default function FormSigNup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setPasswordConfirm] = React.useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [secondName, setSecondName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState(null);
  const [genre, setGenre] = useState();
  const [image, setImage] = useState();
  const [birthDate, setBirthDate] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
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
    api
      .post("/user", {
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
        if (response.status === 200) {
          // Verifica se a resposta é bem-sucedida
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          // Se a resposta não for bem-sucedida, lida com o erro
          setErrorMsg("Erro na requisição: " + response.statusText);
        }
      })
      .catch((error) => {
        console.log("---->>>", error.response.data.message);
        setErrorMsg(error.message);
      });
  };

  // const loginUser = (e) => {
  //   api
  //     .post("/user", {
  //       name,
  //       secondName,
  //       email,
  //       telephone,
  //       genre,
  //       birthDate,
  //       image,
  //       password,
  //       confirmPassword,
  //     })
  //     .then((response) => {
  //       localStorage.setItem("token", response.data.token);
  //       if (response.data.token) {
  //         navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       setErrorMsg(error.message);
  //     });
  // };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    api
      .post("/file/upload", formData)
      .then((response) => {
        setImage(response.data.teste.id);
      })
      .catch((error) => {
        return error;
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

      <CustomTextField onChange={(e) => setName(e.target.value)} label="Name" />

      <CustomTextField
        onChange={(e) => setSecondName(e.target.value)}
        label="Second Name"
      />

      <div
        style={{
          border: "1px solid #bebebe",
          padding: 0,
          height: 50,
          width: "50%",
          borderRadius: 3,
        }}
      >
        <input
          style={{ width: 138, marginTop: 12, padding: 1 }}
          onChange={handleFileChange}
          type="file"
        />
        <label style={{ margin: 5 }}>Escolha imagem</label>
      </div>

      <CustomTextField
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
      />

      <CustomTextField
        onChange={(e) => setTelephone(e.target.value)}
        label="Telephone"
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 11);
        }}
      />

      <CustomTextField
        onChange={(e) => setGenre(e.target.value)}
        label="Genre"
        select
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomTextField>

      <div style={styles.date}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            onChange={(e) => setBirthDate(e)}
            className="fullwidth"
            format="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </div>

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

      <FormControl sx={{ m: 1, width: "50%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="outlined-adornment-password"
          type={showPasswordConfirm ? "text" : "password"}
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

      <CustomButton onClick={loginUser}>Cadastrar-se</CustomButton>

      <a style={{ color: BLUE }} href="/user/login">
        Ja possui conta?
      </a>
    </div>
  );
}
