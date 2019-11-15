import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {

    constructor(props) {
        super(props);  

        this.onChangeUserDescription = this.onChangeUserDescription.bind(this);
        this.onChangeUserResponsible = this.onChangeUserResponsible.bind(this);
        this.onChangeUserPriority = this.onChangeUserPriority.bind(this);
        this.onChangeUserCompleted = this.onChangeUserCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_description: '',
            user_responsible: '',
            user_priority: '',
            user_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    user_description: response.data.user_description,
                    user_responsible: response.data.user_responsible,
                    user_priority: response.data.user_priority,
                    user_completed: response.data.user_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangeUserCompleted(e) {
        this.setState({
            user_completed: !this.state.user_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            user_description: this.state.user_description,
            user_responsible: this.state.user_responsible,
            user_priority: this.state.user_priority,
            user_completed: this.state.user_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update User</h3>
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
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeUserCompleted}
                                checked={this.state.user_completed}
                                value={this.state.user_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}