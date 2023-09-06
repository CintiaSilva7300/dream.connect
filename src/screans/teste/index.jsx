import * as React from "react";
import "./styles.css";

export default function Teste() {
  return (
    <>
      <br />
      <br />

      {/* <!-- Comment container --> */}
      <div class="comments-container">
        <h1>Comments</h1>

        <ul id="comments-list" class="comments-list">
          <li>
            <div class="comment-main-level">
              {/* <!-- Avatar --> */}
              <div class="comment-avatar">
                <img
                  src="https://community.numer.ai/avatar/richardcraib"
                  alt=""
                />
              </div>
              {/* <!-- Container --> */}
              <div class="comment-box">
                <div class="comment-head">
                  <h6 class="comment-name by-author">
                    <a href="http://creaticode.com/blog">richardcraib</a>
                  </h6>
                  <span>20 minutes ago</span>
                  <i class="fa fa-reply"></i>
                  <i class="fa fa-heart"></i>
                </div>
                <div class="comment-content">Lorem</div>
              </div>
            </div>
            {/* <!-- Respuestas de los comentarios --> */}
            <ul class="comments-list reply-list">
              <li>
                {/* <!-- Avatar --> */}
                <div class="comment-avatar">
                  <img src="https://community.numer.ai/avatar/wacax" alt="" />
                </div>
                {/* <!-- Container --> */}
                <div class="comment-box">
                  <div class="comment-head">
                    <h6 class="comment-name">
                      <a href="http://creaticode.com/blog">wacax</a>
                    </h6>
                    <span>10 minutes ago</span>
                    <i class="fa fa-reply"></i>
                    <i class="fa fa-heart"></i>
                  </div>
                  <div class="comment-content">Ipsum</div>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <div class="comment-main-level">
              {/* <!-- Avatar --> */}
              <div class="comment-avatar">
                <img src="https://community.numer.ai/avatar/wsw" alt="" />
              </div>
              {/* <!-- Container --> */}
              <div class="comment-box">
                <div class="comment-head">
                  <h6 class="comment-name">
                    <a href="http://creaticode.com/blog">wsw</a>
                  </h6>
                  <span>10 minutes ago</span>
                  <i class="fa fa-reply"></i>
                  <i class="fa fa-heart"></i>
                </div>
                <div class="comment-content">Nice I just bought 100k</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
