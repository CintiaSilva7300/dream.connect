import * as React from "react";
import "./styles.css";

export default function CommentDinamic() {
  return (
    <>
      <br />
      <br />

      {/* <!-- Comment container --> */}
      <div
        className="comments-container"
        style={{
          margin: 0,
          maginTop: 0,
          marginBottom: 0,
        }}
      >
        <ul
          id="comments-list"
          className="comments-list"
          style={{
            margin: 0,
            maginTop: 0,
            marginBottom: 0,
          }}
        >
          <li>
            <div className="comment-main-level">
              {/* <!-- Avatar --> */}
              <div className="comment-avatar">
                <img
                  src="https://community.numer.ai/avatar/richardcraib"
                  alt=""
                />
              </div>
              {/* <!-- Container --> */}
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author">
                    <a href="http://creaticode.com/blog">richardcraib</a>
                  </h6>
                  <span>20 minutes ago</span>
                  <i className="fa fa-reply"></i>
                  <i className="fa fa-heart"></i>
                </div>
                <div className="comment-content">Lorem</div>
              </div>
            </div>
            {/* <!-- Respuestas de los comentarios --> */}
            <ul className="comments-list reply-list">
              <li>
                {/* <!-- Avatar --> */}
                <div className="comment-avatar">
                  <img src="https://community.numer.ai/avatar/wacax" alt="" />
                </div>
                {/* <!-- Container --> */}
                <div className="comment-box">
                  <div className="comment-head">
                    <h6 className="comment-name">
                      <a href="http://creaticode.com/blog">wacax</a>
                    </h6>
                    <span>10 minutes ago</span>
                    <i className="fa fa-reply"></i>
                    <i className="fa fa-heart"></i>
                  </div>
                  <div className="comment-content">Ipsum</div>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <div className="comment-main-level">
              {/* <!-- Avatar --> */}
              <div className="comment-avatar">
                <img src="https://community.numer.ai/avatar/wsw" alt="" />
              </div>
              {/* <!-- Container --> */}
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name">
                    <a href="http://creaticode.com/blog">wsw</a>
                  </h6>
                  <span>10 minutes ago</span>
                  <i className="fa fa-reply"></i>
                  <i className="fa fa-heart"></i>
                </div>
                <div className="comment-content">Nice I just bought 100k</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
