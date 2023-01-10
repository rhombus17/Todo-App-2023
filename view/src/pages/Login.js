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

const prefix = 'Login';
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

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const userData = { email, password };
        AxiosUtil
            .post('/login', userData)
            .then((response) => {
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
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

    return (
        <Container component="main" maxWidth="xs">
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
                            onChange={ (event) => { setEmail(event.target.value); } }
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
                            onChange={ (event) => { setPassword(event.target.value); } }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                            disabled={loading || !email || !password}
                        >
                            Sign In
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="signup" variant="body2" underline="hover">
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

export default Login;
