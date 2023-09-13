/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";

import styles from "./styles";
import api from "../../utils/Api/api";
import CommentDinamic from "../CommentDinamic";
import { API_PROD } from "../../utils/environments";
import CommentModal from "../publication/components/modalComment";

export default function PublicationLiked() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showComments, setShowComments] = useState({});

  const toggleComments = (postCode) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postCode]: !prevState[postCode],
    }));
  };

  useEffect(() => {
    api
      .get(`${API_PROD}/post/getLikedPostByUserCode`)
      .then((response) => {
        setLikedPosts(response.data);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: 100 }}>
        {likedPosts.map((item) => (
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

              <div
                style={{
                  boxShadow: " 0 0.10px 0 0 #6f6f6f",
                  height: 1,
                  margin: "0px 0px",
                  width: "100%",
                }}
              ></div>
              <IconButton aria-label="add to favorites">
                <GradeIcon style={{ margin: 0, color: "red" }} />
                <p
                  style={{
                    fontSize: 12,
                    color: "#6f6f6f",
                    marginTop: 2,
                  }}
                >
                  {item.likes.length}
                </p>
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
