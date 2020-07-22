import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HttpsIcon from '@material-ui/icons/Https';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

    return(
        <Paper className={root} elevation={3}>
            <div>
                <Grid className={textfield} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField label="Email/Username" />
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
                            autoComplete="current-password"/>
                    </Grid>
                </Grid>
                <Button 
                    variant="outlined" 
                    color="primary">
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