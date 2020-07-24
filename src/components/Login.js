import React, { useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HttpsIcon from '@material-ui/icons/Https';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { CTX } from './Store.js';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '5rem 30rem',
        textAlign: 'center',
        minHeight: '60vh'
    },
    textfield: {
        width: 'fit-content',
        margin: '0 auto'
    },
    link: {
        marginTop: '5rem'
    }
}))


const Login = ({ changeRoute }) => {
    const classes = useStyles();
    const { root, textfield, link } = classes;

    const { userData, setInputValues, fetchUser } = useContext(CTX);

    return(
        <Paper className={root} elevation={3}>
            <div>
                <Grid className={textfield} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField label="Username" onChange={e => setInputValues('username', e)}/>
                    </Grid>
                </Grid>
                <Grid className={textfield} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <HttpsIcon />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={e => setInputValues('password', e)}/>
                    </Grid>
                </Grid>
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => fetchUser(userData, 'login')}>
                    Accedi
                </Button>
                <div className={link}>
                    <Typography variant='body1'>Non sei ancora registrato?</Typography>
                    <button onClick={() => changeRoute('register')}>Registrati</button>
                </div>
            </div>
        </Paper>
    );
}

export default Login;