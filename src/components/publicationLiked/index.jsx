import React, { useEffect, useState } from "react";

import api from "../../utils/Api/api";
import { API_PROD } from "../../utils/environments";

export default function PublicationLiked() {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    api
      .get(`${API_PROD}/post/getLikedPostByUserCode`)
      .then((response) => {
        setLikedPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching liked posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>PUBLICAÇÕES CURTIDAS</h1>
      {likedPosts.map((post) => (
        <div key={post.code}>
          <p>{post.text}</p>
          <img
            src={`${API_PROD}/file/${post.url_media}`}
            alt="foto"
            style={{ width: 200, height: 200 }}
          />
        </div>
      ))}
    </div>
  );
}
