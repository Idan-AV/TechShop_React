import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import { SetUserContext, UserContext } from '../UserContext';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { useContext } from 'react';
import { SetNotificationContext } from '../NotificatinContext';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import MyDrawer from '../MyDrawer/MyDrawer';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = React.useState(false);
  const user = React.useContext(UserContext)
  const setUser = useContext(SetUserContext)
  const setNotification = useContext(SetNotificationContext)
  const [open, setOpen] = React.useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMainMenuOpen = () => {
    setIsMainMenuOpen(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleNavigateHome=()=>{
    navigate('/')
    setIsMainMenuOpen(false)
  }
  const handleOpenNewMenuWithExistingAnchor = () => {
    setAnchorEl(anchorEl); // Set the anchor element for the new menu
    setIsMainMenuOpen(true);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      {user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{
          navigate('/Profile-Page')
          setAnchorEl(null);
    handleMobileMenuClose();
        
        }}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
          {/* <p>Profile</p> */}
        </IconButton>
      </MenuItem>}
      {user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{
          localStorage.clear('token');
          setUser({user:null})
          navigate('/')
          setNotification({open:true,
            msg:'You have succesfully logged out',severity:'success'})
        }}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MeetingRoomOutlinedIcon />
          {/* <p>logout</p> */}
        </IconButton>
      </MenuItem>}
      {!user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{navigate('/login')}}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LoginIcon/>
          {/* <p>Login</p> */}
        </IconButton>
      </MenuItem>}
      {!user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{navigate('/signup')}}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <VpnKeyOutlinedIcon/>
          {/* <p>Signup</p> */}
        </IconButton>
      </MenuItem>}
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{
          navigate('/Profile-Page')
          setMobileMoreAnchorEl(null);
        }}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
          {/* <p>Profile</p> */}
        </IconButton>
      </MenuItem>}
      {user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{
          localStorage.clear('token');
          setUser({user:null})
          navigate('/')
          setNotification({open:true,
            msg:'You have succesfully logged out',severity:'success'})
        }}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MeetingRoomOutlinedIcon />
          {/* <p>logout</p> */}
        </IconButton>
      </MenuItem>}
      {!user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{navigate('/login')}}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LoginIcon/>
          {/* <p>Login</p> */}
        </IconButton>
      </MenuItem>}
      {!user?.user&&
      <MenuItem >
        <IconButton onClick={()=>{navigate('/signup')}}
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <VpnKeyOutlinedIcon/>
          {/* <p>Signup</p> */}
        </IconButton>
      </MenuItem>}
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleOpenNewMenuWithExistingAnchor}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {isMainMenuOpen && (
        <Menu
        anchorEl={anchorEl} // Set the anchor element as needed
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isMainMenuOpen}
          onClose={() => setIsMainMenuOpen(false)} // Close the menu when needed
        >
        <MenuItem onClick={handleNavigateHome}>{<HomeTwoToneIcon/>}</MenuItem>
        {user?.user&&
        <MenuItem onClick={()=>{
          // navigate('/Saved-Products')
          setOpen(true)
          setIsMainMenuOpen(false)
        }}>{<ShoppingCartSharpIcon/>}</MenuItem>
}


        </Menu>
      )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            TechShop
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton 
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {open&&
    <MyDrawer isOpen={open} setIsOpen={setOpen} />}
    </Box>
    
  );
}