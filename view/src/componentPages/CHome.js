import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import Account from './componentComponents/CAccount';
import Todo from './componentComponents/CTodo';

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

class Home extends Component {
    state = {
        render: false
    };

    loadAccountPage = (event) => {
        this.setState({ render: true });
    };

    loadTodoPage = (event) => {
        this.setState({ render: false });
    };

    logoutHandler = () => {
        removeAuthToken();
        this.setState({ returnToLogin: true });
    };

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            profilePicture: '',
            uiLoading: true,
            imageLoading: false,
            returnToLogin: false
        };
    }

    componentWillMount = () => {
        const authToken = getAuthToken();
        if (authToken === null)
        {
            this.setState({ returnToLogin: true });
        }
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        AxiosUtil
            .get('/user')
            .then((response) => {
                console.log(response.data);
                const user = response.data.userCredentials;
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture,
                    uiLoading: false
                });
            })
            .catch((error) => {
                console.log(error.message);
                if (!error.response) {
                    console.log("Internal Error");
                    this.logoutHandler();
                }
                else if (error.response.status === 403) {
                    console.log("Access denied");
                    this.logoutHandler();
                }
                this.setState({ errorMsg: 'Error in retrieving the data' });
            });
    }

    render() {
        if (this.state.uiLoading === true) {
            return (
                <StyleWrapper>
                <div className={classes.root}>
                    { this.state.returnToLogin && (
                        <Navigate to="/c/login" />
                    )}
                    {this.state.uiLoading  && <CircularProgress size={100} className={classes.uiProgress} />}
                </div>
                </StyleWrapper>
            );
        } else {
            return (
                <StyleWrapper>
                { this.state.returnToLogin && (
                    <Navigate to="/c/login" />
                )}
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
                            { this.state.imageLoading ? 
                            <div>
                                <CircularProgress size={150} classNmae={classes.uiProgress} />
                            </div> :
                            <div>
                                <Avatar src={this.state.profilePicture} className={classes.avatar} />
                                <p>
                                    {` ${this.state.firstName} ${this.state.lastName} `}
                                </p>
                            </div>
                            }
                        </center>
                        <Divider />
                        <List>
                            <ListItemButton key="Todo" onClick={this.loadTodoPage}>
                                <ListItemIcon>
                                    {' '} <NotesIcon /> {' '}
                                </ListItemIcon>
                                <ListItemText primary="Todo" />
                            </ListItemButton>

                            <ListItemButton key="Account" onClick={this.loadAccountPage}>
                                <ListItemIcon>
                                    {' '} <AccountBoxIcon /> {' '}
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItemButton>

                            <ListItemButton key="Logout" onClick={this.logoutHandler}>
                                <ListItemIcon>
                                    {' '} <ExitToAppIcon /> {' '}
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>

                        </List>
                    </Drawer>

                    <div>
                        { this.state.render ? 
                            <Account /> : 
                            <Todo />}
                    </div>

                </div>
                </StyleWrapper>
            );
        }
    }
};

export default Home;
