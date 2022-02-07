import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import {Link, NavLink, withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Body from '../body/Body';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import "./header.css";
import {Nav, Navbar} from 'react-bootstrap'
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/img/PermitMeLogo1.png'
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Header() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const auth = useSelector(state => state.auth)
    const {user, isLogged, iam} = auth
    const nameLength = isLogged? (user?.name ? (user.name).length : 0): 0
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const userLink =() => {
    return (
      <>
        {/* <div className="d-flex justify-content-center"> */}
        <Nav.Link as={NavLink} exact to={"/profile"} className="gpk-link" activeClassName="gpk-link-active">
          <ListItem button key={"item"}>
            <ListItemIcon >
              <Avatar alt="profile img" src={user?.avatar} />
            </ListItemIcon>
            <ListItemText primary={"My Profile"} secondary={iam}/>
          </ListItem>
        </Nav.Link>
        {/* </div> */}
       {[{name: "Dashboard", icon :<HomeRoundedIcon />,role:"any", link: "/"},
       {name: "Request Pass", icon :<ContactMailRoundedIcon />, role:"student",link: "/request"},
       {name: "Student Request", icon :<ContactMailRoundedIcon />, role:"hod", link: "/hod/request"},
       {name: "Faculty", icon :<ContactMailRoundedIcon />, role:"hod", link: "/hod/faculty"},
       {name: "Logout", icon :<LogoutRounded />, role:"any", link: "/logout"}
       ].map((item, index) => {
         if(iam === item.role || item.role === "any"){
          return (<Nav.Link as={NavLink} exact to={item.link} className="gpk-link" activeClassName="gpk-link-active">
            <ListItem button key={item}>
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Nav.Link>
          )}
         })}
      </>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="transparent" style={{'backgroundColor': 'white'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PermitMe
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={logo} alt="logo" style={{maxHeight: "50px"}}/>
          <IconButton onClick={handleDrawerClose}>
            
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        { isLogged ? userLink():
          [ {name: "Home", icon :<HomeRoundedIcon />, link: "/"},
          {name: "Login", icon :<LoginRoundedIcon />, link: "/login"},
            {name: "Register", icon :<AppRegistrationRoundedIcon />, link: "/register" }
          ].map((item, index) => (
            <Nav.Link as={NavLink} exact to={item.link} className="gpk-link" activeClassName="gpk-link-active">
              <ListItem button key={item}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Nav.Link>
          )) }

        </List>
        <Divider />
      </Drawer>
      <Main open={open} className="gpk-bg min-vh-100">
        <DrawerHeader />
                <Body />
      </Main>
    </Box>
  );
}

export default withRouter(Header);