import React from 'react';
import io from 'socket.io-client';

const CTX = React.createContext();

// Chat
const initState = {
    topic1: [],
    topic2: []
};

const reducer = (state, action) => {
    const { from, msg, topic } = action.payload;

    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from: from,
                        msg: msg,
                        topic: topic
                    }
                ]
            }
        default:
            return state;
    }
};

let socket;

const sendMessage = (value) => {
    socket.emit('chat message', value);
};

// User
const userState = {
    username: '',
    email: '',
    password: ''
};

const userReducer = (state, action) => {
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
};

const fetchUser = (user, route) => {
    fetch(`http://localhost:3001/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(userEmail => console.log(userEmail))
} 


const Store = (props) => {
    const [allChats, dispatch] = React.useReducer(reducer, initState)
    const [userData, userDispatch] = React.useReducer(userReducer, userState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', msg => dispatch({type: 'RECEIVE_MESSAGE', payload: msg}));
    }

    const setInputValues = (inputType, e) => {
        userDispatch({
            type: 'ON_CHANGE', 
            payload: {
                [inputType]: e.target.value
            }
        })
    }

    return(
        <CTX.Provider value={{ allChats, sendMessage, userData, setInputValues, fetchUser }}>
            {props.children}
        </CTX.Provider>
    );
}

export {
    Store,
    CTX
};