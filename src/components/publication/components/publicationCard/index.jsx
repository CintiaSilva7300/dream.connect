/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./styles";
import api from "../../../../utils/Api/api";
import Avatar from "../../../avatar/index";
import CommentModal from "../modalComment/index";
import { API_PROD } from "../../../../utils/environments";
import CommentDinamic from "../../../CommentDinamic";

export default function PublicationCard({ posts, userCurrent }) {
  const [like, setLike] = useState();
  const [likeStatus, setLikeStatus] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [showComments, setShowComments] = useState({});
  let user = userCurrent.code;

  const toggleComments = (postCode) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postCode]: !prevState[postCode],
    }));
  };

  useEffect(() => {
    const fetchAllLikes = async () => {
      try {
        const likesData = await api.get("/like");
        const allLikes = likesData.data;

        // Inicializa likeStatus com os likes existentes
        const initialLikeStatus = {};
        allLikes.forEach((like) => {
          initialLikeStatus[like.postCode] = true;
          setLike(allLikes);
        });
        setLikeStatus(initialLikeStatus);

        // Atualiza a contagem de likes para o post
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
  }, [posts]);

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

          // Atualiza a contagem de likes para o post
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
                  style={{ width: 521, height: 500, objectFit: "contain" }} //essa "objectFit: "contain"" torna a imagem responsiva
                  src={`${API_PROD}/file/${item.url_media}`}
                  alt="foto"
                />
              </div>
              <div>
                <div style={styles.lineHorizont}></div>

                <IconButton aria-label="add to favorites">
                  {likeStatus[item.code] ? (
                    <GradeIcon
                      onClick={() => likePost(item.code)}
                      style={{
                        margin: 0,
                        color:
                          likeStatus[item.code] && user === item.userCode
                            ? "red"
                            : "",
                      }}
                    />
                  ) : (
                    <GradeIcon
                      onClick={() => likePost(item.code)}
                      style={{ margin: 0, color: "" }}
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
  );
}
