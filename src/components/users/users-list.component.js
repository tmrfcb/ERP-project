import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.user_description}</td>
        <td>{props.user.user_responsible}</td>
        <td>{props.user.user_priority}</td>
        <td>
            <Link to={"/edit/"+props.user._id}>Edit</Link>
        </td>
    </tr>
)

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
 
        axios.get('http://localhost:4000/users/').then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    userList() {
        return this.state.users.map(function(currentUser, i){
            return <User user={currentUser} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}