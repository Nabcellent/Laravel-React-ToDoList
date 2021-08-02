import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

class StudentIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students:[],
            loading:true
        }
    }

    async componentDidMount() {
        const res = await axios.get('/api/students')

        if(res.data.status === 200) {
            this.setState({
                students: res.data.students,
                loading:false
            })
        }
    }

    deleteStudent = async (e, id) => {
        const thisClickedFunc = e.currentTarget;
        thisClickedFunc.innerText = "Deleting...";

        const res = await axios.delete(`/api/students/delete/${id}`)

        if (res.data.status) {
            thisClickedFunc.closest('tr').remove();

            await Swal.fire({
                title: 'Deleted!',
                text: res.data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    render() {
        let studentTable = "";

        if(this.state.loading) {
            studentTable = <tr><td colSpan="6"><div><hr/><h4 className="text-center">Fetching records...</h4><hr/></div></td></tr>
        } else {
            if(Array.isArray(this.state.students) && this.state.students.length) {
                studentTable = this.state.students.map((student, index) => {
                    return(
                        <tr key={student.id}>
                            <td>{index+1}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td>{student.phone}</td>
                            <td>
                                <div className="d-flex justify-content-evenly">
                                    <Link to={`/students/edit/${student.id}`} className="btn btn-sm btn-success">Edit</Link>
                                    <button className="btn btn-sm btn-outline-danger"
                                            onClick={(e) => this.deleteStudent(e, student.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    )
                })
            } else {
                studentTable = <tr><td colSpan="6" className="text-center">No existing records...</td></tr>
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between align-items-center">
                                    <h4 className="h3">All Students</h4>
                                    <Link to={'/students/create'} className="btn btn-sm btn-primary">Create Student</Link>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-borderless table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Course</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentTable}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentIndex;
