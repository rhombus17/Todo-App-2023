import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    TextField,
    Link,
    Grid,
    Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

import AxiosUtil from '../util/AxiosUtil';
import { setAuthToken } from '../util/AuthUtil';

const prefix = 'Signup';
const classes = {
    paper: `${prefix}-paper`,
    avatar: `${prefix}-avatar`,
    form: `${prefix}-form`,
    submit: `${prefix}-submit`,
    customError: `${prefix}-customError`,
    progress: `${prefix}-progress`
}
const StyleWrapper = styled('div')(({ theme }) => ({
    [`& .${classes.paper}`]: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    [`& .${classes.avatar}`]: {
        margin: 1,
        backgroundColor: theme.palette.secondary.main
    },
    [`& .${classes.form}`]: {
        width: '100%',
        marginTop: 3
    },
    [`& .${classes.submit}`]: {
        marginTop: 3,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 2
    },
    [`& .${classes.customError}`]: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    [`& .${classes.progress}`]: {
        position: 'absolute'
    }
}));

const Signup = (props) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const newUserData = {
            firstName,
            lastName,
            username,
            phoneNumber,
            country,
            email,
            password,
            confirmPassword
        }
        AxiosUtil
            .post('/signup', newUserData)
            .then((response) => {
                // localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                setAuthToken(`Bearer ${response.data.token}`);
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                console.log(error)
                if (error.response !== null)
                    setErrors(error.response.data);
                setLoading(false);
            });
    };

    const submitEnabled = !loading && (firstName && lastName && username && phoneNumber && country && email && password && confirmPassword);

    return (
        <Container component="main" maxWidth="xs">
            <StyleWrapper>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    autoComplete="firstName"
                                    helperText={errors.firstName}
                                    error={errors.firstName ? true : false}
                                    onChange={ (event) => { setFirstName(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="lastName"
                                    helperText={errors.lastName}
                                    error={errors.lastName ? true : false}
                                    onChange={ (event) => { setLastName(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="phoneNumber"
                                    pattern="[7-9]{1}[0-9]{9}"
                                    helperText={errors.phoneNumber}
                                    error={errors.phoneNumber ? true : false}
                                    onChange={ (event) => { setPhoneNumber(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="country"
                                    name="country"
                                    label="Country"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="country"
                                    helperText={errors.country}
                                    error={errors.country ? true : false}
                                    onChange={ (event) => { setCountry(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="username"
                                    helperText={errors.username}
                                    error={errors.username ? true : false}
                                    onChange={ (event) => { setUsername(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="email"
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    onChange={ (event) => { setEmail(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="current-password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    onChange={ (event) => { setPassword(event.target.value); } }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoComplete="current-password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    onChange={ (event) => { setConfirmPassword(event.target.value); } }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                            disabled={!submitEnabled}
                        >
                            Sign up
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="login" variant="body2" underline="hover">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                    </form>
                </div>
            </StyleWrapper>
        </Container>
    );
}

export default Signup;
