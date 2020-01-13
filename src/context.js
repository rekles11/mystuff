import React, { Component } from 'react';
import axios from 'axios';

//context
const Context = React.createContext();
//reducers
const reducer = (state, action) => {
    switch(action.type){
        case 'DELETE_CONTACT':
            return{ 
                ...state,
                contacts: state.contacts.filter(contact =>
                contact.id !== action.payload)
            };
            case 'ADD_CONTACT':
            return{ 
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
            case 'UPDATE_CONTACT':
            return{ 
                ...state,
                contacts: state.contacts.map(contact => 
                    contact.id === action.payload.id ? (contact = action.payload) : contact)
            };
        default:
            return state;
    }
}
export class Provider extends Component{
    //empty state/contacts
    state = {
        contacts: [],
        dispatch: action => this.setState(state => reducer(state, action))
    };
    //go get contacts
    async componentDidMount(){
        const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            this.setState({contacts: res.data});
    }
    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>    
        )
    }
}
//return Consumer so you don't have to keep writting Context.Consumer
export const Consumer = Context.Consumer;