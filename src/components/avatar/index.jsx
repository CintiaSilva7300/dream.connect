import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import img from '../../utils/img/foto.jpeg';
// import { useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      // position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    //Bolinha verde do avatar ficara piscando com "keyframes ripple"
    '0%': {
      // transform: 'scale(.8)',
      // opacity: 1,
    },
    '100%': {
      // transform: 'scale(2.4)',
      // opacity: 0,
    },
  },
}));

export default function BadgeAvatars() {
  //   const [userData, setUserData] = useState(null);
  //   const token = localStorage.getItem('token');

  //   useEffect(() => {
  //     if (token) {
  //       const decodeToken = jwt_decode(token);
  //       console.log('->', token);
  //       setUserData(decodeToken);
  //     }
  //   }, []);

  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        style={{ margin: 10 }}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={img} />
      </StyledBadge>
    </Stack>
  );
}
