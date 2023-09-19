
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export function UserData() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
  }, []);

  if (!userData) {
    return <>CARREGANDO...</>;
  }

  return userData; // Retorna o objeto userData quando estiver disponível
}
