import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

class StudentCreate extends Component {
    state = {
        name:"",
        email:"",
        course:"",
        phone:"",

        errorList: {},
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createStudent = async (e) => {
        e.preventDefault();

        document.getElementById('btn-create').disabled = true;
        document.getElementById('btn-create').innerText = "Creating...";

        const {data} = await axios.post('/api/students/create', this.state);

        if (data.status) {
            this.setState({
                name:"",
                email:"",
                course:"",
                phone:"",
                errorList: {}
            });

            this.props.history.push('/students')

            await Swal.fire({
                title: 'Created!',
                text: data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            this.setState({errorList: data.inputError})

            document.getElementById('btn-create').innerText = "Create";
            document.getElementById('btn-create').disabled = false;
        }
    }

    render() {
        const {state} = this;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between align-items-center">
                                    <h4 className="h3 text-red-900">Create Student</h4>
                                    <Link to={'/students'} className="btn btn-sm btn-primary">All Student</Link>
                                </div>
                                <form onSubmit={this.createStudent}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Name</label>
                                        <input type="text" name="name" className="form-control" value={state.name}
                                               onChange={this.handleInput}/>
                                        <small className="text-danger">{state.errorList.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Email</label>
                                        <input type="email" name="email" className="form-control" value={state.email}
                                               onChange={this.handleInput}/>
                                        <small className="text-danger">{state.errorList.email}</small>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label htmlFor="">Course</label>
                                                <input type="text" name="course" className="form-control" value={state.course}
                                                       onChange={this.handleInput}/>
                                                <small className="text-danger">{state.errorList.course}</small>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label htmlFor="">Phone number</label>
                                                <input type="tel" name="phone" className="form-control" value={state.phone}
                                                       onChange={this.handleInput}/>
                                                <small className="text-danger">{state.errorList.phone}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 text-end">
                                        <button type="submit" id="btn-create" className="btn btn-outline-primary">Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentCreate;
