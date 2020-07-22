import React from 'react';
import io from 'socket.io-client';

const CTX = React.createContext();

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

const user = Math.random('abcdefghijklmnopqrstuvwxyz'[25]) + Math.random(100).toFixed(2);

const Store = (props) => {
    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', msg => dispatch({type: 'RECEIVE_MESSAGE', payload: msg}));
    }

    return(
        <CTX.Provider value={{ allChats, sendMessage, user }}>
            {props.children}
        </CTX.Provider>
    );
}

export {
    Store,
    CTX
};