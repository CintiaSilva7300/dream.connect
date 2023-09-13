import * as React from "react";
import "./styles.css";

import { API_PROD } from "../../utils/environments";
import { formatDateToStringDateBr } from "../../utils/formatDate";

export default function CommentDinamic({ post }) {
  return (
    <>
      {post.comments.map((comment) => (
        <div style={{ fontFamily: "sans-serif" }}>
          <div>
            <div
              className="comments-container"
              style={{
                margin: -0,
                marginTop: -0,
                marginBottom: 0,
                padding: 0,
              }}
            >
              <ul className="comments-list">
                <li>
                  <ul className="comments-list reply-list">
                    <li>
                      <div
                        className="comment-avatar"
                        style={{
                          marginTop: -10,
                          marginLeft: 0,
                          marginRight: 0,
                        }}
                      >
                        <img
                          src={`${API_PROD}/file/${comment.user.image}`}
                          alt=""
                          style={{ borderRadius: "100%" }}
                        />
                      </div>

                      <div
                        className="comment-box"
                        style={{
                          width: 455,
                          marginLeft: 55,
                          // border: "0.1px solid #cfcfcf",
                          boxShadow:
                            "rgba(2, 2, 2, 0.25) 0px 4px 8px -2px, rgba(179, 179, 179, 0.08) 0px 0px 0px 1px",
                          borderRadius: 3,
                        }}
                      >
                        <div className="comment-head">
                          <h6 className="comment-name">
                            <a href="/perfil">{comment.user.name}</a>
                          </h6>
                          <span className="posted-time">
                            {formatDateToStringDateBr(comment.registerDate)}
                          </span>
                        </div>
                        <div className="comment-content">{comment.text}</div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
