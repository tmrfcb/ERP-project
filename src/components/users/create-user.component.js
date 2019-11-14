import React, { Component } from 'react';
import axios from 'axios';
export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_description: '',
            user_responsible: '',
            user_priority: '',
            user_completed: false
        }
        this.onChangeUserDescription = this.onChangeUserDescription.bind(this);
        this.onChangeUserResponsible = this.onChangeUserResponsible.bind(this);
        this.onChangeUserPriority = this.onChangeUserPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUserDescription(e) {
        this.setState({
            user_description: e.target.value
        });
    }
    onChangeUserResponsible(e) {
        this.setState({
            user_responsible: e.target.value
        });
    }
    onChangeUserPriority(e) {
        this.setState({
            user_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); 
        console.log(`Form submitted:`);
        console.log(`User Description: ${this.state.user_description}`);
        console.log(`User Responsible: ${this.state.user_responsible}`);
        console.log(`User Priority: ${this.state.user_priority}`);
      
        const newUser = {
            user_description: this.state.user_description,
            user_responsible: this.state.user_responsible,
            user_priority: this.state.user_priority,
            user_completed: this.state.user_completed
        };

        axios.post('http://localhost:4000/users/add', newUser)
            .then(res => console.log(res.data));

        this.setState({
            user_description: '',
            user_responsible: '',
            user_priority: '',
            user_completed: false
        })
    }

 
render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.user_description}
                                onChange={this.onChangeUserDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.user_responsible}
                                onChange={this.onChangeUserResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.user_priority==='Low'} 
                                    onChange={this.onChangeUserPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.user_priority==='Medium'} 
                                    onChange={this.onChangeUserPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.user_priority==='High'} 
                                    onChange={this.onChangeUserPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         
        )
    }
}
