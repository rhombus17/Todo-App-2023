import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Account from '../components/Account';
import Todo from '../components/Todo';

import AxiosUtil from '../util/AxiosUtil';
import { getAuthToken, removeAuthToken } from '../util/AuthUtil';

import {
    AppBar,
    Avatar,
    CircularProgress,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotesIcon from '@mui/icons-material/Notes';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';

const drawerWidth = 240;

const prefix = 'Home';
const classes = {
    root: `${prefix}-root`,
    appBar: `${prefix}-appBar`,
    drawer: `${prefix}-drawer`,
    drawerPaper: `${prefix}-drawerPaper`,
    content: `${prefix}-content`,
    avatar: `${prefix}-avatar`,
    uiProgress: `${prefix}-uiProgress`,
    toolbar: `${prefix}-toolbar`,
}
const StyleWrapper = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        display: 'flex'
    },
    [`& .${classes.appBar}`]: {
        zIndex: theme.zIndex.drawer + 1
    },
    [`& .${classes.drawer}`]: {
        width: drawerWidth,
        flexShrink: 0
    },
    [`& .${classes.drawerPaper}`]: {
        width: drawerWidth
    },
    [`& .${classes.content}`]: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    [`& .${classes.avatar}`]: {
        height: 100,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
        marginTop: 20
    },
    [`& .${classes.uiProgress}`]: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    [`& .${classes.toolbar}`]: theme.mixins.toolbar
}));

const Home = (props) => {
    const navigate = useNavigate();
    const [render, setRender] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [uiLoading, setUILoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(false);
    const [newImageUploaded, setNewImageUploaded] = useState(false);
    const [errors, setErrors] = useState([]);

    const loadAccountPage = (event) => {
        event.preventDefault();
        setRender(true);
    };

    const loadTodoPage = (event) => {
        event.preventDefault();
        setRender(false);
    };

    const logoutHandler = () => {
        removeAuthToken();
        navigate('/login');
    };

    useEffect(() => {
        LoadUserData();
    }, []);

    useEffect(() => {
        if (newImageUploaded === true)
        {
            LoadUserData();
        }
    }, [])

    const LoadUserData = () => {
        const authToken = getAuthToken();
        if (authToken === null)
        {
            navigate('/');
        }
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        AxiosUtil
            .get('/user')
            .then((response) => {
                const user = response.data.userCredentials;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setProfilePicture(user.profilePicture);
                setUILoading(false);
                setNewImageUploaded(false);
            })
            .catch((error) => {
                console.log(error.message);
                if (!error.response) {
                    console.log("Internal Error");
                    logoutHandler();
                }
                else if (error.response.status === 403) {
                    console.log("Access denied");
                    logoutHandler();
                }
                setErrors({ errorMsg: 'Error in retrieving the data' });
            });
    }

    if (uiLoading === true) {
        return (
            <StyleWrapper>
            <div className={classes.root}>
                {uiLoading && newImageUploaded && <CircularProgress size={100} className={classes.uiProgress} />}
            </div>
            </StyleWrapper>
        );
    } else {
        return (
            <StyleWrapper>
            <div className={classes.root}>
                <AppBar position = "fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Todo App 2023
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                    <div className={classes.toolbar} />
                    <Divider />
                    <center>
                        {imageLoading ? 
                        <div>
                            <CircularProgress size={150} classNmae={classes.uiProgress} />
                        </div> :
                        <div>
                            <Avatar src={profilePicture} className={classes.avatar} />
                            <p>
                                {` ${firstName} ${lastName} `}
                            </p>
                        </div>
                        }
                    </center>
                    <Divider />
                    <List>
                        <ListItemButton key="Todo" onClick={loadTodoPage}>
                            <ListItemIcon>
                                {' '} <NotesIcon /> {' '}
                            </ListItemIcon>
                            <ListItemText primary="Todo" />
                        </ListItemButton>

                        <ListItemButton key="Account" onClick={loadAccountPage}>
                            <ListItemIcon>
                                {' '} <AccountBoxIcon /> {' '}
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItemButton>

                        <ListItemButton key="Logout" onClick={logoutHandler}>
                            <ListItemIcon>
                                {' '} <ExitToAppIcon /> {' '}
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>

                    </List>
                </Drawer>

                <div>
                    { render ? 
                        <Account
                            setImageLoading={setImageLoading}
                            setNewImageUploaded={setNewImageUploaded} /> : 
                        <Todo />}
                </div>

            </div>
            </StyleWrapper>
        );
    }
};

export default Home;
