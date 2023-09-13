import * as React from "react";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./styles";
import api from "../../utils/Api/api";
import { API_PROD } from "../../utils/environments";
import CommentModal from "../publication/components/modalComment";
import CommentDinamic from "../CommentDinamic";

export default function CardToPostUser() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [post, setPost] = React.useState(null);
  const [showComments, setShowComments] = useState({});

  const toggleComments = (postCode) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postCode]: !prevState[postCode],
    }));
  };

  useEffect(() => {
    if (token) {
      try {
        const decodeToken = jwt_decode(token);
        setUserData(decodeToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserData(null);
      }
    }

    api
      .get(`${API_PROD}/post`)
      .then((response) => {
        if (response.data === false) {
          return;
        } else {
          api.get(`${API_PROD}/post`).then((response) => {
            setPost(response.data);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  if (!userData || post === null) {
    return null;
  }

  const filteredPostsToUser = post.filter(
    (singlePost) => singlePost.user.email === userData.email
  );

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: 100 }}>
        {filteredPostsToUser.map((item) => (
          <>
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
                  <Avatar
                    style={{
                      margin: 0,
                      padding: 0,
                      marginLeft: 5,
                      objectFit: "contain",
                    }}
                    alt="avatar"
                    src={`${API_PROD}/file/${item.user.image}`}
                  />

                  <p style={{ marginTop: 5, margin: 5, cursor: "pointer" }}>
                    {item.user.name}
                  </p>
                </div>
              </div>
              <p style={styles.text}>{item.text} </p>
              <div>
                <img
                  style={{ width: 521, height: 500, objectFit: "contain" }}
                  src={`${API_PROD}/file/${item.url_media}`}
                  alt="foto"
                />
              </div>

              <IconButton aria-label="add to favorites">
                <FavoriteIcon style={{ margin: 0 }} />
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
            {showComments[item.code] && <CommentDinamic post={item} />}
          </>
        ))}
      </Container>
    </>
  );
}
