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

const prefix = 'CLogin';
const classes = {
    paper: `${prefix}-paper`,
    avatar: `${prefix}-avatar`,
    form: `${prefix}-form`,
    submit: `${prefix}-submit`,
    customError: `${prefix}-customError`,
    progress: `${prefix}-progress`
}
const Paper = styled('div')(({ theme }) => ({
    [`&.${classes.paper}`]: {
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
        mt: 3,
        mx: 0,
        mb: 2
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

// class login extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: '',
//             password: '',
//             errors: [],
//             loading: false
//         };
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Container Login</h1>
//                 <Avatar>
//                     <LockOutlinedIcon />
//                 </Avatar>
//             </div>
//         );
//     }
// }

const login = () => {
    return (
            <div>
                <h1>Container Login</h1>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </div>
        
    )
}


export default login;