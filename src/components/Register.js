import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const initState = {
    username: '',
    email: '',
    password: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'ON_CHANGE':
            if (action.payload.username) {
                return {
                    ...state,
                    username: action.payload.username
                }
            } else if (action.payload.email) {
                return {
                    ...state,
                    email: action.payload.email
                }
            } else if (action.payload.password) {
                return {
                    ...state,
                    password: action.payload.password
                }
            };
            break;
        default:
            return state;
    }
}

const registerUser = (user) => {
    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(userEmail => console.log(userEmail))
} 

const Register = ({ changeRoute }) => {
    const classes = useStyles();
    const { root, textfield, link } = classes;

    const [user, dispatch] = React.useReducer(reducer, initState);
    const setInputValues = (inputType, e) => {
        dispatch({
            type: 'ON_CHANGE', 
            payload: {
                [inputType]: e.target.value
            }
        })
    }

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
                onClick={() => registerUser(user)}>
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