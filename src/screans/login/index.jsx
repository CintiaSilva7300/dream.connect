import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "./styles";
import FormLogin from "../../components/formLogin";
import { Box, Marca, H1, Form, Card } from "./styles";

export default function Login() {
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
      <div style={{ fontSize: 30, textAlign: "center", marginTop: 50 }}>
        <h1 style={{ fontFamily: "revert", fontWeight: "bold" }}>
          Novidades em alta
        </h1>
      </div>
      <div style={styles.container}>
        <div id="scrollCard">
          <Card>
            <div>
              <img style={styles.img} src="" alt="" />
              <p style={{ margin: 10 }}>
                Hoje o dia foi produtivo!, fiz varios nadas.... :) Hoje o dia
                foi produtivo!, fiz varios nadas.... :)
              </p>

              <IconButton aria-label="add to favorites">
                <FavoriteIcon style={{ margin: 0 }} />
              </IconButton>
              <IconButton aria-label="share">
                <ChatBubbleIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
