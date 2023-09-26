import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./styles";
import api from "../../utils/Api/api";
import FormLogin from "../../components/formLogin";
import { Box, Marca, H1, Form } from "./styles";
import Avatar from "../../components/avatar";
import { API_PROD } from "../../utils/environments";
import CommentDinamic from "../../components/CommentDinamic";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import Alert from "react-bootstrap/Alert";

export default function Login() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});

  const toggleComments = (postCode) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postCode]: !prevState[postCode],
    }));
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleShow = () => {
    setShowAlert(true);
    window.scrollTo(0, 0); //rola a tela na possição informada
    setTimeout(() => {
      setShowAlert(false); //após 4 segundo o alert fecha sozinho
    }, 10000);
  };

  useEffect(() => {
    if (loading) {
      api
        .get("/post")
        .then((response) => {
          const postsData = response.data;
          setPosts(postsData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    // Verifica se há posts antes de prosseguir
    if (posts.length === 0) {
      return;
    }

    // Filtra e remove posts com likes não numéricos ou indefinidos
    const validPosts = posts.filter(
      (post) => typeof post.likes === "number" && !isNaN(post.likes)
    );

    // Encontra o número máximo de likes
    const maxLikes = Math.max(...validPosts.map((post) => post.likes));

    // Filtra os posts que têm o número máximo de likes
    const postsComMaisLikes = validPosts.filter(
      (post) => post.likes === maxLikes
    );

    console.log("mais likes:", postsComMaisLikes);
  }, [posts]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50vh",
        }}
      >
        <CircularProgress style={{ width: 70, height: 70, color: "#037199" }} />
        <h1
          style={{
            fontSize: 30,
            fontFamily: "cursive",
            fontWeight: 700,
            color: "#037199",
            margin: 10,
          }}
        >
          Carregando...
        </h1>
      </div>
    );
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>;
  }

  return (
    <>
      <Box>
        <Marca>
          <H1>Dream Connect</H1>
        </Marca>
        <Form>
          <FormLogin />
        </Form>
      </Box>

      <div style={styles.container}>
        <div
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: 30,
            marginLeft: 0,
            marginRight: 80,
            padding: 20,
          }}
        >
          <h1 style={{ fontFamily: "revert", fontWeight: "bold" }}>
            Novidades em alta
          </h1>
        </div>

        {showAlert && (
          <Alert
            style={{
              position: "absolute",
              backgroundColor: "#aebdc2",
              left: "10px", // Ajuste a posição horizontal conforme necessário
              top: "87vh", // Ajuste a posição vertical conforme necessário
              rigth: "",
              zIndex: 10,
              borderColor: "#000709",
              fontFamily: "cursive",
              fontWeight: 700,
            }}
            variant="danger"
            dismissible
            onClose={handleClose}
          >
            <Alert.Heading>
              <strong style={{ color: "red" }}>Ocorreu um erro</strong>, parece
              que você não esta logado!
            </Alert.Heading>
            <p>Faça login ou registra-se para comentar ou curti.</p>
          </Alert>
        )}

        <Container maxWidth="sm">
          {posts.map((item) => (
            <>
              <div key={item.code}>
                <div style={styles.box}>
                  <div
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#037199",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginTop: 10,
                        padding: 5,
                      }}
                    >
                      <Avatar imagePostUser={item.user.image} />
                      <p style={{ marginTop: 5, margin: 5, cursor: "pointer" }}>
                        {item.user.name}
                      </p>
                    </div>
                  </div>
                  <p style={styles.text}>{item.text}</p>
                  <div>
                    <img
                      style={{ width: 521, height: 500, objectFit: "contain" }}
                      src={`${API_PROD}/file/${item.url_media}`}
                      alt="foto"
                    />
                  </div>
                  <div>
                    <div style={styles.lineHorizont}></div>

                    <IconButton
                      aria-label="add to favorites"
                      onClick={handleShow}
                    >
                      <GradeIcon style={{ margin: 0 }} />
                      <p
                        style={{
                          fontSize: 12,
                          color: "#6f6f6f",
                          marginTop: 2,
                        }}
                      >
                        {item.likes.length || ""}
                      </p>
                    </IconButton>

                    <IconButton aria-label="share">
                      <ChatBubbleIcon onClick={handleShow} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>

                    <a
                      onClick={() => toggleComments(item.code)}
                      style={{
                        marginLeft: 300,
                        color: "#999",
                        textDecoration: "underline",
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      comentário {item.comments.length || ""}
                    </a>
                  </div>
                </div>
                {showComments[item.code] && <CommentDinamic post={item} />}
              </div>
            </>
          ))}
        </Container>
      </div>
    </>
  );
}
