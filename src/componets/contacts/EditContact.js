import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };
    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
    }
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        //deconstruct state so I can just use the property names
        const {name, email, phone} = this.state;
        //check for errors
        if(name === ''){
            this.setState({errors: {name: 'Name is required'}});
            return;
        }
        if(email === ''){
            this.setState({errors: {email: 'Email is required'}});
            return;
        }
        if(phone === ''){
            this.setState({errors: {phone: 'Phone is required'}});
            return; 
        }
        const updContact ={
            name,
            email,
            phone
        }

        const {id} = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
        dispatch({type: 'UPDATE_CONTACT', payload: res.data});

        //clear the state
        this.setState({
            name:'',
            email: '',
            phone: '',
            errors: {}
        })
        this.props.history.push('/');
    };
    //this is to allow for changes. the inputs are locked without this.
    onChange = (e) => this.setState({[e.target.name]: e.target.value})


    render() {
        //deconstructed state to properties
        const {name, email, phone, errors} = this.state;
        return (
                <Consumer>
                    {value => {
                        const { dispatch } = value;
                    return(
                        <div className="card mb-3">
                        <div className="card-header">
                            Edit Contact
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <TextInputGroup
                                    label = "Name"
                                    name = "name"
                                    placeholder = "Enter Name..."
                                    type = "text"
                                    value ={name}
                                    onChange = {this.onChange}
                                    error = {errors.name}
                                />
                                <TextInputGroup
                                    label = "Email"
                                    name = "email"
                                    placeholder = 'Enter Email...'
                                    value = {email}
                                    type = "email"
                                    onChange = {this.onChange}
                                    error = {errors.email}
                                />
                                <TextInputGroup
                                    label = "Phone"
                                    name = "phone"
                                    placeholder = 'Enter Phone...'
                                    value = {phone}
                                    type = "text"
                                    onChange = {this.onChange}
                                    error = {errors.phone}
                                />
                                <input 
                                    type="submit" 
                                    value="Update Contact" 
                                    className="btn btn-block btn-light"/>
                            </form>
                        </div>
                    </div>
                    )
                }}
            </Consumer>
        )
    }
}