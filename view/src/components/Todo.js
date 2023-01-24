import React, { useState } from 'react';

import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Slide,
    TextField,
    Toolbar,
    Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

// Auth

const prefix = 'Todo';
const classes = {
    content: `${prefix}-content`,
    toolbar: `${prefix}-toolbar`
};
const StyleWrapper = styled('div')(({ theme }) => ({
    [`& .${classes.content}`]: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    [`& .${classes.toolbar}`]: theme.mixins.toolbar
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Todo = (props) => {
    const [uiLoading, setUILoading] = useState(true);

    const handleClickOpen = (event) => {
        event.preventDefault();
    };

    const handleClickClose = (event) => {
        event.preventDefault();
        handleClose();
    };

    const handleClose = () => {

    };


    if (uiLoading === true) {
        return (
            <StyleWrapper>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {uiLoading && <CircularProgress size={150} classNmae={classes.uiProgress} />}
            </main>
            </StyleWrapper>
        )
    }
    else {
        <StyleWrapper>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                
                <IconButton 
                    className={classes.floatingButton} 
                    color='primary' 
                    aria-label="Add Todo"
                    onClick={handleClickOpen}
                >
                    <AddCircleIcon style={{ fontSize: 60 }} />
                </IconButton>

                {/* <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar>
                        <IconButton 
                            edge='start'
                            color='inherit'
                            onClick={handleClickClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </AppBar>
                </Dialog> */}
            </main>
        </StyleWrapper>
    }

    return (
        <StyleWrapper>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography>
                    Hello I am a todo
                </Typography>
            </main>
        </StyleWrapper>
    )
}

export default Todo;