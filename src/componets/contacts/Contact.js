import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class Contact extends Component {
    //when intially showing contact don't expand
    state = {
        showContactInfo: false
    };
    //delet method
    onDeleteClick = async (id, dispatch) => {
        //try async axios call
        try{
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            dispatch({type: 'DELETE_CONTACT', payload: id});
        } 
        //using fake api this is to unbreak the appication.
        //use a real catch on real api
        catch(e){
            dispatch({type: 'DELETE_CONTACT', payload: id});  
        }
    }
    //either show or don't show contact info
    onShowClick = (e) => {
        this.setState({ showContactInfo:
        !this.state.showContactInfo });
    };
    render() {
        //deconstruct the state
        const {id, name, email, phone} = this.props.contact;
        //T/F for showing the Contact
        const { showContactInfo } = this.state;
        return (
            //context
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return(
                            <div className="card card-body mb-3">
                                <h4>{name}{' '} 
                                    <i onClick={this.onShowClick} 
                                        className="fas fa-sort-down" 
                                        style={{cursor: 'pointer' }} />
                                    <i onClick = {this.onDeleteClick.bind(this, id, dispatch)}  
                                        className="fas fa-times" 
                                        style={{cursor: 'pointer', float: 'right', color: 'red'}}/>
                                    <Link to={`contact/edit/${id}`}>
                                        <i className="fas fa-pencil-alt" 
                                            style={{
                                                cursor: 'pointer', 
                                                float: 'right', 
                                                color: 'black',
                                                marginRight: '1rem'
                                            }}/> 
                                    </Link>
                                </h4> 
                                {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                                ) : null }
                            </div>
                    )
                }}
            </Consumer> 
        )
    }
}
Contact.propTypes = {
    contact: PropTypes.object.isRequired
}


