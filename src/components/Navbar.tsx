'use client';
import * as React from 'react';
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
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
// import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog', 'Upload'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const { data: session, status } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // handleCloseUserMenu();
    signOut();
  };

  return (
    <AppBar
      position='static'
      sx={{
        boxShadow: '0px 6px 40px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <ImageSearchIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            onClick={() => {
              handleLogout();
            }}
            sx={{
              mr: 40,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Picture ID
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <ImageSearchIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Picture ID
            </Typography>
            {/* <Menu
              id='menu-appbar'
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          {/* <ImageSearchIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          /> */}
          {/* <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           Picture ID
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={page === 'Upload' ? '/uploadPic' : page}>
                  {page}
                </Link>
              </Button>
            ))} */}
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 0 }}>
            {/* <Button component={Link} href='/login' sx={{ color: 'white', textDecoration: 'none' }}> Login</Button>
            <Button component={Link} href='/signup' sx={{ color: 'white', textDecoration: 'none' }}> Sign up</Button>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip> */}
            {!session ? (
              <>
                <Button
                  component={Link}
                  href='/login'
                  sx={{ color: 'white', textDecoration: 'none' }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href='/signup'
                  sx={{ color: 'white', textDecoration: 'none', marginLeft: '-10px' }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              // <Tooltip title='Open settings'>
              //   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              //     <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              //   </IconButton>
              // </Tooltip>
              <Button
                // component={Link}
                onClick={handleLogout}
                sx={{ color: 'white', textDecoration: 'none' }}
              >
                Logout
              </Button>
            )}
            {/* <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === 'Logout' ? handleLogout : handleCloseUserMenu
                  }
                >
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
