import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';

export default function IconMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    if (logout) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <IconButton
        style={{
          margin: 0,
          padding: 0,
        }}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ textAlign: 'center' }}
      >
        <MenuItem onClick={handleClose} style={{ display: 'block' }}>
          <LogoutIcon onClick={logout} />
        </MenuItem>
      </Menu>
    </div>
  );
}
