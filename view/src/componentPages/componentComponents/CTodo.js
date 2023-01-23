import React, { Component } from 'react';

import {
    Typography } from '@mui/material';
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

class Todo extends Component {
    render() {
        return (
            <StyleWrapper>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Hello I am todo
                </Typography>
            </main>
            </StyleWrapper>
        )
    }
}

export default Todo;