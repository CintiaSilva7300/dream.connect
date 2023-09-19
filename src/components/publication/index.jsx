import Box from "@mui/joy/Box";
import jwt_decode from "jwt-decode";
import Textarea from "@mui/joy/Textarea";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";
import Container from "@mui/material/Container";

import api from "../../utils/Api/api";
import { API_PROD } from "../../utils/environments";
import PublicationCard from "./components/publicationCard/index";
import CustomButton from "../basicComponents/CustomButton";

export default function Publication() {
  const [text, setText] = useState();
  const [italic, setItalic] = React.useState(false);
  const token = localStorage.getItem("token");
  const [url_media, setUrl_media] = useState();
  const [post, setPost] = React.useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
    api.get(`/post`).then((response) => {
      setPost(response.data);
    });
  }, []);

  const publication = () => {
    api
      .post(`/post`, {
        text,
        url_media,
      })
      .then((response) => {
        if (response.data === false) {
          return;
        } else {
          handleFileUpload();
          api.get(`/post`).then((response) => {
            setPost(response.data);
          });

          return setText(""), setSelectedFile(null);
        }
      });
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    api
      .post("/file/upload", formData)
      .then((response) => {
        setUrl_media(response.data.teste.id);
      })
      .catch((error) => {
        return error;
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    handleFileUpload(e.target.files[0]);
  };

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
            fontFamily: "sans-serif",
            fontWeight: 400,
            color: "#037199",
            marginLeft: 20,
          }}
        >
          Faça uma publicação agora, {userData.name}
        </p>

        <Textarea
          value={text}
          style={{
            borderColor: "#037199",
            margin: 20,
            width: "95%",
          }}
          onChange={(e) => setText(e.target.value)}
          placeholder="Diga como está seu dia..."
          minRows={3}
          startDecorator={
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <a href="/perfil">
                <img
                  style={{
                    padding: 5,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                  src={`${API_PROD}/file/${userData.image}`}
                  alt="foto"
                />
              </a>

              {selectedFile && (
                <img
                  style={{
                    marginTop: 10,
                    width: 425,
                    height: 500,
                    objectFit: "contain",
                  }}
                  src={URL.createObjectURL(selectedFile)}
                  alt="img"
                />
              )}
            </Box>
          }
          endDecorator={
            <Box
              sx={{
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              <div>
                <input
                  style={{ width: 300, padding: 5 }}
                  onChange={handleFileChange}
                  type="file"
                  id="teste"
                ></input>
              </div>

              <CustomButton
                onClick={publication}
                style={{
                  width: 155,
                  height: 30,
                  borderRadius: 20,
                  marginLeft: 30,
                  backgroundColor: "#037199",
                }}
              >
                Publicar
              </CustomButton>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight: "normal",
            fontStyle: italic ? "italic" : "initial",
          }}
        />
      </FormControl>

      <div style={{ marginTop: 25 }}>
        <PublicationCard posts={post} userCurrent={userData} />
      </div>
    </Container>
  );
}
