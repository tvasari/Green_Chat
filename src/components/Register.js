import React, { useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { CTX } from './Store.js';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10vh auto',
        textAlign: 'center',
        minHeight: '60vh',
        width: '30rem'
    },
    textfield: {
        margin: '7px 30%',
        width: '40%'
    },
    link: {
        marginTop: '5rem'
    }
}))


const Register = ({ changeRoute }) => {
    const classes = useStyles();
    const { root, textfield, link } = classes;

    const { userData, setInputValues, fetchUser } = useContext(CTX);

    return(
        <Paper className={root} elevation={3}>
            <TextField 
                className={textfield} 
                label="Username" 
                onChange={e => setInputValues('username', e)}/>
            <TextField 
                className={textfield} 
                label="Email"
                onChange={e => setInputValues('email', e)}/>
            <TextField
                className={textfield}
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={e => setInputValues('password', e)}/>
            <Button 
                variant="outlined" 
                color="primary"
                onClick={() => fetchUser(userData, 'register')}>
                Registrati
            </Button>
            <div className={link}>
                <Typography variant='body1'>Sei già registrato?</Typography>
                <button onClick={() => changeRoute('login')}>Accedi</button>
            </div>
        </Paper>
    );
}

export default Register;