import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

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

import AxiosUtil from '../util/AxiosUtil';
import { getAuthToken, removeAuthToken } from '../util/AuthUtil';

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

const Account = (props) => {
    const { setImageLoading, setNewImageUploaded } = props;
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [uiLoading, setUILoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [imageError, setImageError] = useState('');

    const logoutHandler = () => {
        removeAuthToken();
        navigate('/login');
    }

    useEffect(() => {
        const authToken = getAuthToken();
        if (authToken === null)
            navigate('/login');
        
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        AxiosUtil
            .get('/user')
            .then((response) => {
                console.log(response.data);
                const user = response.data.userCredentials;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setUsername(user.username);
                setPhoneNumber(user.phoneNumber);
                setEmail(user.email);
                setCountry(user.country);
                setUILoading(false);
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
    });

    const HandleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const ProfilePictureHandler = (event) => {
        event.preventDefault();
        setImageLoading(true);
        const authToken = getAuthToken();
        if (authToken === null)
            navigate('/login');
        
        let formData = new FormData();
        formData.append('image', image);
        formData.append('content', content);
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        AxiosUtil
            .post('/user/image', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(() => {
                setImageLoading(false);
                setNewImageUploaded(true);
                // window.location.reload();
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
                setImageLoading(false);
                setErrors({ errorMsg: 'Error in retrieving the data' });
            });
    };

    const UpdateFormValues = (event) => {
        event.preventDefault();
        setButtonLoading(true);
        const authToken = getAuthToken();
        if (authToken === null)
            navigate('/login');
        
        AxiosUtil.defaults.headers.common = { Authorization: `${authToken}` };
        const formRequest = {
            firstName,
            lastName,
            country
        };
        AxiosUtil
            .put('/user', formRequest)
            .then(() => {
                setButtonLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setButtonLoading(false);
            });
    };

    if (uiLoading === true) {
        return (
            <StyleWrapper>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {uiLoading && <CircularProgress size={150} classNmae={classes.uiProgress} />}
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
                                    {firstName} {lastName}
                                </Typography>
                                <Button variant='outlined' color='primary' type='submit' size='small'
                                    startIcon={<CloudUploadIcon/>}
                                    className={classes.uploadButton}
                                    onClick={ProfilePictureHandler}
                                    >
                                    Upload Photo
                                </Button>
                                <input type="file" onChange={HandleImageChange} />

                                {imageError ? (
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
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        fullWidth
                                        margin='dense'
                                        variant='outlined'
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label='Last name'
                                        name='lastName'
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        fullWidth
                                        margin='dense'
                                        variant='outlined'
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label='Email'
                                        name='email'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
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
                                        value={phoneNumber}
                                        onChange={(event) => setPhoneNumber(event.target.value)}
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
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
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
                                        value={country}
                                        onChange={(event) => setCountry(event.target.value)}
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
                    onClick={UpdateFormValues}
                    disabled={ buttonLoading || !firstName || !lastName || !country }
                    >
                    Save details
                    {buttonLoading && <CircularProgress size={30} classNmae={classes.uiProgress} />}
                </Button>
            </main>
            </StyleWrapper>
        );
    }
}

export default Account;
