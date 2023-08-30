import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import styles from "./styles";
import { BLUE } from "../../utils/constants";
import { API_PROD } from "../../utils/environments";

export default function AccordionComment({ post }) {
  console.log("aaaaaaa ->->->>", post);
  return (
    <div>
      <>
        <Accordion style={{ color: BLUE }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p>Ver comentarios...</p>
          </AccordionSummary>
          {post.comments.map((comment) => (
            <AccordionDetails>
              <Card variant="outlined" style={styles.card}>
                {/* <Avatar src={`${API_PROD}/file/${comment.user.image}`} /> */}

                <div>
                  {comment.url_media ? (
                    <div>
                      <Avatar src={`${API_PROD}/file/${comment.user.image}`} />

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{
                            width: 521,
                            height: 500,
                            objectFit: "contain",
                          }}
                          src={`${API_PROD}/file/${comment.url_media}`}
                          alt="img"
                        />
                      </div>

                      <h1>
                        <strong>{comment.user.name}</strong>
                      </h1>
                      <hi style={styles.text}>{comment.text}</hi>
                    </div>
                  ) : (
                    <div>
                      <Avatar src={`${API_PROD}/file/${comment.user.image}`} />
                      <h1>
                        <strong>{comment.user.name}</strong>
                      </h1>
                      <hi style={styles.text}>{comment.text}</hi>
                    </div>
                  )}
                </div>
              </Card>
            </AccordionDetails>
          ))}
        </Accordion>
      </>
    </div>
  );
}
