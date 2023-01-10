import React, { Component } from 'react';

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
import { Navigate } from 'react-router';

const prefix = 'CLogin';
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
        marginTop: 1
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

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        AxiosUtil
            .post('/login', userData)
            .then((response) => {
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                this.setState({
                    loading: false,
                    authenticated: true
                });
                // this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
                console.log(error.response.data);
                this.setState({
                    errors: error.response.data,
                    loading: false
                });
            });
    };

    render() {
        const { errors, loading, authenticated } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                { authenticated && (
                    <Navigate to="/" />
                )}
                <StyleWrapper>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                id="email"
                                name="email"
                                label="Email Address"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoFocus
                                autoComplete="email"
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="current-password"
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                onChange={this.handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
                                disabled={loading || !this.state.email || !this.state.password}
                            >
                                Sign In
                                {loading && <CircularProgress size={30} className={classes.progress} />}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="signup" variant="body2">
                                        {"Don't have an account? Sign up"}
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
}


export default login;
