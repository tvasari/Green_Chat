import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { CTX } from './Store.js';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5rem',
    text: 'center'
  },
  topicsWindow: {
    width: '30%',
    height: '65vh',
    borderRight: '1px solid green'
  },
  chatWindow: {
    width: '70%',
    height: '65vh'
  },
  chatBox: {
    width: '80%',
    height: '30%'
  },
  button: {
    width: '20%'
  },
  flex: {
    display: 'flex',
  }
}));

const Dashboard = () => {
    const classes = useStyles();

    const {allChats, sendMessage, user} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    const [textValue, changeTextValue] = React.useState('');
    const [actualTopic, changeActualTopic] = React.useState(topics[0])

    return(
        <Paper className={classes.root} elevation={3}>
            <Typography variant='h5'>The Green Chat</Typography>
            <Typography variant='h6'>{actualTopic}</Typography>
            <div className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <List>
                        {
                            topics.map((topic, i) => {
                                return(
                                    <ListItem key={i} onClick={() => changeActualTopic(topic)} button>
                                        <ListItemText key={topic} primary={topic} />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </div>
                <div className={classes.chatWindow}>
                    {
                        allChats[actualTopic].map((msg, i) => {
                            return(
                                <div key={i} className={classes.flex}>
                                    <Chip
                                        key={i + msg.msg}
                                        avatar={<Avatar>{msg.from[0].toUpperCase()}</Avatar>}
                                        label={msg.from}
                                        clickable
                                        color="primary"
                                    />
                                    <Typography key={msg.msg} variant='body1'>{msg.msg}</Typography>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className={classes.flex}>
                <TextField 
                    className={classes.chatBox} 
                    label="Scrivi un messaggio" 
                    variant="outlined" 
                    onChange={e => changeTextValue(e.target.value)}
                    value={textValue}/>
                <Button 
                    className={classes.button} 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                        sendMessage({from: user, msg: textValue, topic: actualTopic})
                        changeTextValue('');
                    }}>
                    Invia
                </Button>
            </div>
        </Paper>
    );
}

export default Dashboard; 