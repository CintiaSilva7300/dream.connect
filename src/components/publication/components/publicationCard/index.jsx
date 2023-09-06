import React from "react";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import GradeIcon from "@mui/icons-material/Grade";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./styles";
import { CardText } from "./styles";
import api from "../../../../utils/Api/api";
import Avatar from "../../../avatar/index";
import CommentModal from "../modalComment/index";
import AccordionComment from "../../../accordionComment";
import { API_PROD } from "../../../../utils/environments";

export default function PublicationCard({ posts }) {
  const [like, setLike] = useState();
  const [likeStatus, setLikeStatus] = useState({});
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const fetchAllLikes = async () => {
      try {
        const likesData = await api.get("/like");
        const allLikes = likesData.data;

        // Inicialize likeStatus com os likes existentes
        const initialLikeStatus = {};
        allLikes.forEach((like) => {
          initialLikeStatus[like.postCode] = true;
        });
        setLikeStatus(initialLikeStatus);

        // Atualize a contagem de likes para o post
        const initialLikeCounts = {};
        posts.forEach((post) => {
          const postLikes = allLikes.filter(
            (like) => like.postCode === post.code
          );
          initialLikeCounts[post.code] = postLikes.length;
        });
        setLikeCounts(initialLikeCounts);
      } catch (error) {
        console.error("Erro ao buscar os likes:", error);
      }
    };

    fetchAllLikes();
  }, [posts]); // Certifique-se de atualizar os likes quando os posts mudarem

  const likePost = (postCode) => {
    if (!likeStatus[postCode]) {
      api
        .post(`/like`, {
          like: true,
          postCode,
        })
        .then((response) => {
          setLikeStatus((prevLikeStatus) => ({
            ...prevLikeStatus,
            [postCode]: true,
          }));

          // Atualize a contagem de likes para o post
          setLikeCounts((prevLikeCounts) => ({
            ...prevLikeCounts,
            [postCode]: (prevLikeCounts[postCode] || 0) + 1,
          }));
          console.log("Post curtido:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao curtir o post:", error);
        });
    }
  };

  if (!posts) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
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

  return (
    <Container maxWidth="sm">
      {posts.map((item) => (
        <>
          {item.url_media ? (
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
                  style={{ width: 521, height: 500, objectFit: "contain" }} //essa "objectFit: "contain"" torna a imagem responsiva
                  src={`${API_PROD}/file/${item.url_media}`}
                  alt="foto"
                />
              </div>
              <div>
                <IconButton aria-label="add to favorites">
                  {likeStatus[item.code] ? (
                    <GradeIcon
                      onClick={() => likePost(item.code)}
                      onChange={(e) => setLike(e.target.value)}
                      style={{ margin: 0, color: "red" }}
                    />
                  ) : (
                    <GradeIcon
                      onClick={() => likePost(item.code)}
                      onChange={(e) => setLike(e.target.value)}
                      style={{ margin: 0 }}
                    />
                  )}
                  {likeCounts[item.code] > 0 && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6f6f6f",
                        marginTop: 2,
                      }}
                    >
                      {likeCounts[item.code]}
                    </p>
                  )}
                </IconButton>

                <IconButton aria-label="share">
                  <CommentModal postCode={item.code} />
                  {/*<CommentModal post={item.code} />; passando informação para outro componente */}
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
              <AccordionComment post={item} />
            </div>
          ) : (
            <CardText>
              <div style={{ marginTop: 25 }}>
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                    padding: 5,
                  }}
                >
                  <Avatar />
                  <p style={styles.nameText}>{item.user.name}</p>
                </div>
                <p style={styles.conteudoText}>{item.text}</p>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <CommentModal postCode={item.code} />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
              <AccordionComment post={item} />
            </CardText>
          )}
        </>
      ))}
    </Container>
  );
}
