import * as React from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";

import { styled } from "@mui/material/styles";
import { API_PROD } from "../../utils/environments";
import { getCountryFromGeolocation } from "../../utils/geolocation";

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

export default function AvatarIcon({ imagePostUser }) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (country === null) {
      // Use a função importada para obter o país
      getCountryFromGeolocation().then((countryData) => {
        if (countryData) {
          setCountry(countryData);
        }
      });
    }
  }, [country]);

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
            src={`${API_PROD}/file/${imagePostUser}`}
          />
        </StyledBadge>
      </Stack>

      {country !== null ? (
        <div style={{ display: "flex", color: "#a2a2a2", padding: 1 }}>
          <PlaceIcon style={{ width: 12, height: 12 }} />
          <p style={{ fontSize: 10 }}>{country.replace("SP, ", "")}</p>
        </div>
      ) : (
        <PlaceIcon style={{ width: 12, height: 12 }} />
      )}
    </div>
  );
}
