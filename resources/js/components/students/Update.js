import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

class StudentUpdate extends Component {
    state = {
        id:this.props.match.params.id,
        name:"",
        email:"",
        course:"",
        phone:"",
        errorList: {},
    }

    async componentDidMount() {
        const {data} = await axios.get(`/api/students/edit/${this.state.id}`)

        if(data.status === 200) {
            let {student} = data;

            this.setState({
                name: student.name,
                email: student.email,
                course: student.course,
                phone: student.phone,
            })
        } else if (data.status === 404) {
            this.props.history.push('/students');

            await Swal.fire({
                title: 'Oops!',
                text: data.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            })
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateStudent = async (e) => {
        e.preventDefault();

        document.getElementById('btn-update').disabled = true;
        document.getElementById('btn-update').innerText = "Updating...";
        const {data} = await axios.put(`/api/students/update/${this.state.id}`, this.state);

        if (data.status) {
            this.props.history.push('/students');

            await Swal.fire({
                title: 'Updated!',
                text: data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        } else if(data.hasOwnProperty('inputError')) {
            this.setState({errorList: data.inputError})

            document.getElementById('btn-update').innerText = "Update";
            document.getElementById('btn-update').disabled = false;
        } else {
            await Swal.fire({
                title: 'Error!',
                text: data.message || "Something went wrong",
                icon: 'error',
                confirmButtonText: 'Ok'
            })

            document.getElementById('btn-update').innerText = "Update";
            document.getElementById('btn-update').disabled = false;
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
                                    <h4 className="h3 text-red-900">Update Student</h4>
                                    <Link to={'/students'} className="btn btn-sm btn-primary">All Student</Link>
                                </div>
                                <form onSubmit={this.updateStudent}>
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
                                        <button type="submit" id="btn-update" className="btn btn-outline-primary">Update</button>
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

export default StudentUpdate;
