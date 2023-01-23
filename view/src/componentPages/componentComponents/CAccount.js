import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    TextField,
    Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';

import AxiosUtil from '../../util/AxiosUtil';
import { getAuthToken, removeAuthToken } from '../../util/AuthUtil';

const prefix = 'Account';
const classes = {
    content: `${prefix}-content`,
    toolbar: `${prefix}-toolbar`,
    root: `${prefix}-root`,
    details: `${prefix}-details`,
    avatar: `${prefix}-avatar`,
    locationText: `${prefix}-locationText`,
    buttonProperty: `${prefix}-buttonProperty`,
    uiProgress: `${prefix}-uiProgress`,
    progress: `${prefix}-progress`,
    uploadButton: `${prefix}-uploadButton`,
    customError: `${prefix}-customError`,
    submitButton: `${prefix}-submitButton`
};
const StyleWrapper = styled('div')(({ theme }) => ({
    [`& .${classes.content}`]: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    [`& .${classes.toolbar}`]: theme.mixins.toolbar,
    [`& .${classes.root}`]: { },
    [`& .${classes.details}`]: {
        display: 'flex'
    },
    [`& .${classes.avatar}`]: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    [`& .${classes.locationText}`]: {
        paddingLeft: '15px'
    },
    [`& .${classes.buttonProperty}`]: {
        position: 'absolute',
        top: '50%'
    },
    [`& .${classes.uiProgress}`]: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    [`& .${classes.progress}`]: {
        position: 'absolute'
    },
    [`& .${classes.uploadButton}`]: {
        marginLeft: '8px',
        margin: theme.spacing(1)
    },
    [`& .${classes.customError}`]: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    [`& .${classes.submitButton}`]: {
        marginTop: '10px'
    }
}));

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            phoneNumber: '',
            country: '',
            email: '',
            errors: [],
            uiLoading: false,
            imageError: '',
            returnToLogin: false
        }
    }

    componentWillMount = () => {
        const authToken = getAuthToken();
        if (authToken === null)
        {
            this.state({ returnToLogin: true });
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
                    username: user.username,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    country: user.country,
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
                this.setState({ erros: { errorMsg: 'Error in retrieving the data' } });
            });
    }

    logoutHandler = () => {
        removeAuthToken();
        this.setState({ returnToLogin: true });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleImageChange = (event) => {
        this.setState({
            image: event.target.files[0]
        });
    }

    profilePictureHandler = (event) => {
        event.preventDefault();
        this.setState({
            uiLoading: true
        });
        const authToken = getAuthToken();
        if (authToken === null)
            this.setState({ returnToLogin: true });
        
        let formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('content', this.state.content);
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        AxiosUtil
            .post('/user/image', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(() => {
                window.location.reload();
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
                this.setState({
                    uiLoading: false,
                    imageError: 'Error in retrieving the data'
                });
            });
    };

    updateFormValues = (event) => {
        event.preventDefault();
        this.setState({ buttonLoading: true });
        const authToken = getAuthToken();
        if (authToken === null)
            this.setState({ returnToLogin: true });
        
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        const formRequest = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country
        };
        AxiosUtil
            .put('/user', formRequest)
            .then(() => {
                this.setState({ buttonLoading: false });
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.setState({ returnToLogin: true });
                }
                console.log(error.message);
                this.setState({ buttonLoading: true });
            });
    };

    render() {
        if (this.state.uiLoading === true) {
            return (
                <StyleWrapper>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.returnToLogin && <Navigate to="/c/login" />}
                    {this.state.uiLoading && <CircularProgress size={150} classNmae={classes.uiProgress} />}
                </main>
                </StyleWrapper>
            );
        } else {
            return (
                <StyleWrapper>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Card className={classes.root}>
                        <CardContent>
                            <div className={classes.details}>
                                <div>
                                    <Typography className={classes.locationText} gutterBottom variant='h4'>
                                        {this.state.firstName} {this.state.lastName}
                                    </Typography>
                                    <Button variant='outlined' color='primary' type='submit' size='small'
                                        startIcon={<CloudUploadIcon/>}
                                        className={classes.uploadButton}
                                        onClick={this.profilePictureHandler}
                                        >
                                        Upload Photo
                                    </Button>
                                    <input type="file" onChange={this.handleImageChange} />

                                    {this.state.imageError ? (
                                        <div className={classes.customError}>
                                            {' '}
                                            Wrong Immage Format || Supported Formats are PNG and JPG
                                        </div>
                                    ) : (
                                        false
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <Divider />
                    </Card>

                    <br />

                    <Card className={classes.root}>
                        <form>
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            label='First name'
                                            name='firstName'
                                            value={this.state.firstName}
                                            onChange={ this.handleChange }
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            label='Last name'
                                            name='lastName'
                                            value={this.state.lastName}
                                            onChange={ this.handleChange }
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            label='Email'
                                            name='email'
                                            value={this.state.email}
                                            onChange={ this.handleChange }
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                            disabled={true}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            label='Phone Number'
                                            name='phoneNumber'
                                            value={this.state.phoneNumber}
                                            onChange={ this.handleChange }
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                            disabled={true}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            label='Username'
                                            name='username'
                                            value={this.state.username}
                                            onChange={ this.handleChange }
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                            disabled={true}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            label='Country'
                                            name='country'
                                            value={this.state.country}
                                            onChange={ this.handleChange }
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions />
                        </form>
                    </Card>
                    <Button variant='contained' color='primary' type='submit'
                        className={classes.submitButton}
                        onClick={this.updateFormValues}
                        disabled={ this.state.buttonLoading || 
                            !this.state.firstName || 
                            !this.state.lastName || 
                            !this.state.country }
                        >
                        Save details
                        {this.state.buttonLoading && <CircularProgress size={30} classNmae={classes.uiProgress} />}
                    </Button>
                </main>
                </StyleWrapper>
            );
        }

    }
}

export default Account;
