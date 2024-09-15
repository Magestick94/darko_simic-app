import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import LogoIcon from './LogoIcon';
import NavLinks from '../data/navLinks.json';

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [user, setUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (newUser) => {
    setAnchorElUser(null);
    setUser(newUser);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to={"/"}>
              <LogoIcon></LogoIcon>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {NavLinks.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.path} style={{textDecoration: "none", color: "black", textTransform: "uppercase"}}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {NavLinks.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.path} style={{textDecoration: "none", color: "white"}}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', justifyContent: 'center' }}>
            <LogoIcon></LogoIcon>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user ? user : "Select user"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={()=>handleCloseUserMenu(null)}
            >
              <MenuItem key={1} onClick={()=>handleCloseUserMenu('User')}>
                <Typography textAlign="center">
                  <Link to={'user-dashboard'} style={{textDecoration: "none", color: "black"}}>
                    {'User'}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem key={2} onClick={()=>handleCloseUserMenu('Admin')}>
                <Typography textAlign="center">
                  <Link to={'admin-dashboard'} style={{textDecoration: "none", color: "black"}}>
                    {'Admin'}
                  </Link>
                </Typography>
              </MenuItem>
              { user ?
                (
                  <MenuItem key={3} onClick={()=>handleCloseUserMenu(null)}>
                    <Typography textAlign="center">
                      <Link to={'/'} style={{textDecoration: "none", color: "black"}}>
                        {'Logout'}
                      </Link>
                    </Typography>
                  </MenuItem>
                ) : ( null )
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
