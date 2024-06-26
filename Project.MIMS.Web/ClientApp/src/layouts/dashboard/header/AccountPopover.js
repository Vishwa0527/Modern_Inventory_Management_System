import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [userId, setUserId] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [userData, setUserData] = useState({
    userName: "",
    email: ""
  });
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);
  }, []);

  useEffect(() => {
    GetUserDetailsByUserID();
    GetUserImageData();

  }, [userId]);

  const onClickHandler = () => navigate(`/login`)
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  async function GetUserDetailsByUserID() {
    const result = await axios.get('https://localhost:7211/api/User/GetUserDetailsByUserID', {
      params: {
        userId: userId
      }
    });
    setUserData({
      userName: result.data.data.userName,
      email: result.data.data.email
    });
  }

  async function GetUserImageData() {
    if (userId !== 0) {
      const result = await axios.get('https://localhost:7211/api/User/GetUserImageByUserID', {
        params: {
          userId: userId
        }
      });

      setImageData(result.data.data);
      CreateBase64URL(result.data.data.image);
    }

  }

  function CreateBase64URL(image) {
    const imageUrl = `data:image/jpeg;base64,${image}`;
    setImageURL(imageUrl)
  }

  return (
    <>
      <Typography>
        <img style={{ margin: 'auto', display: 'block', width: '80%' }} src="/assets/mims.png" alt="notificationbar" />
      </Typography>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={imageURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={onClickHandler} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>

    </>
  );
}
