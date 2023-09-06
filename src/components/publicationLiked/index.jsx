import React, { useEffect, useState } from "react";

import api from "../../utils/Api/api";
import { API_PROD } from "../../utils/environments";

export default function PublicationLiked() {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    // Passo 1: Obter a lista de publicações curtidas pelo usuário
    api
      .get(`${API_PROD}/like`)
      .then((response) => {
        const likedPostCodes = response.data.map((like) => like.postCode);

        // Passo 2: Obter as publicações correspondentes com base nos códigos das publicações curtidas
        api.get(`${API_PROD}/post`).then((response) => {
          const allPosts = response.data;
          const userLikedPosts = allPosts.filter((post) =>
            likedPostCodes.includes(post.code)
          );
          // Atualizar o estado com as publicações curtidas pelo usuário
          setLikedPosts(userLikedPosts);
        });
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
