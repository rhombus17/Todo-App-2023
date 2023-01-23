import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

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

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            phoneNumber: '',
            country: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: [],
            loading: false,
            authenticated: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const newUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            phoneNumber: this.state.phoneNumber,
            country: this.country,
            email: this.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        AxiosUtil
            .post('/signup', newUserData)
            .then((response) => {
                // localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                setAuthToken(`Bearer ${response.data.token}`);
                this.setState({ 
                    loading: false,
                    authenticated: true 
                });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ 
                    errors: error.response !== null ? error.response.data : [],
                    loading: false
                });
            });
    };

    dataEntered = () => { 
        return (
            this.state.firstName && 
            this.state.lastName && 
            this.state.username && 
            this.state.phoneNumber && 
            this.state.country && 
            this.state.email && 
            this.state.password && 
            this.state.confirmPassword
        );
    };

    render() {
        const { errors, loading, authenticated } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                { authenticated && (
                    <Navigate to="/c" />
                )}
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
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
                                        onChange={ this.handleChange }
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
                                disabled={!loading && this.dataEntered}
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
    )};
}

export default Signup;
