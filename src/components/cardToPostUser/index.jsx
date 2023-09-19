/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import PlaceIcon from "@mui/icons-material/Place";
import GradeIcon from "@mui/icons-material/Grade";

import styles from "./styles";
import api from "../../utils/Api/api";
import { API_PROD } from "../../utils/environments";
import CommentModal from "../publication/components/modalComment";
import CommentDinamic from "../CommentDinamic";
import { getCountryFromGeolocation } from "../../utils/geolocation";
import { UserData } from "../../utils/userData";

export default function CardToPostUser() {
  const [post, setPost] = React.useState(null);
  const [showComments, setShowComments] = useState({});
  const [country, setCountry] = useState(null);
  const userData = UserData();

  useEffect(() => {
    if (country === null) {
      getCountryFromGeolocation().then((countryData) => {
        if (countryData) {
          setCountry(countryData);
        }
      });
    }
  }, [country]);

  const toggleComments = (postCode) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postCode]: !prevState[postCode],
    }));
  };

  useEffect(() => {
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

  const teste = post.filter(
    (singlePost) => singlePost.user.email === userData.email
  );
  console.log(teste.likes);

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
                {country !== null ? (
                  <div
                    style={{ display: "flex", color: "#a2a2a2", padding: 1 }}
                  >
                    <PlaceIcon style={{ width: 12, height: 12 }} />
                    <p style={{ fontSize: 10 }}>
                      {country.replace("SP, ", "")}
                    </p>
                  </div>
                ) : (
                  <PlaceIcon style={{ width: 12, height: 12 }} />
                )}
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
                <GradeIcon
                  style={{
                    margin: 0,
                    color: item.likes.length ? "red" : "",
                  }}
                />

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
                <CommentModal postCode={item.code} />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <a
                onClick={() => toggleComments(item.code)}
                style={{
                  marginLeft: 310,
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
