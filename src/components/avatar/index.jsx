import * as React from "react";
import jwt_decode from "jwt-decode";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";

import { styled } from "@mui/material/styles";
import { API_PROD } from "../../utils/environments";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

export default function AvatarIcon() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const { coords } = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${REACT_APP_GOOGLE_API_KEY}`
        );

        const data = await response.json();
        const countryComponent = data.results.find((component) =>
          component.types.includes("country")
        );

        if (countryComponent) {
          setCountry(countryComponent.formatted_address);
        } else {
          console.error("Informações de país não encontradas");
        }
      } catch (error) {
        console.error("Erro ao obter informações de localização:", error);
      }
    };
    if (country === null) {
      fetchCountry();
    }
  }, [country]);

  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setUserData(decodeToken);
    }
  }, []);

  if (!userData) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ display: "block" }}>
      <Stack direction="row" spacing={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            style={{
              margin: 0,
              padding: 0,
              marginLeft: 5,
              objectFit: "contain",
            }}
            alt="avatar"
            src={`${API_PROD}/file/${userData.image}`}
          />
        </StyledBadge>
      </Stack>

      {country !== null ? (
        <div style={{ display: "flex", color: "#a2a2a2", padding: 2 }}>
          <PlaceIcon style={{ width: 12, height: 12 }} />
          <p style={{ fontSize: 10 }}>{country}</p>
        </div>
      ) : (
        <PlaceIcon style={{ width: 12, height: 12 }} />
      )}
    </div>
  );
}
