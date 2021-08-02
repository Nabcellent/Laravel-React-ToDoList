import React, {Component} from "react";
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-9">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="card-title text-center">
                                    <h2 className="h3 text-red-900">Hello, Welcome To My First React App</h2>
                                    <hr/>
                                </div>
                                <div className="row">
                                    <div className="col p-3">
                                        <Link to={'/todo'} className="bg-primary p-5 d-flex justify-content-center">
                                            <h3 className="text-white">ToDoList App</h3>
                                        </Link>
                                    </div>
                                    <div className="col p-3">
                                        <Link to={'students'} className="bg-primary p-5 d-flex justify-content-center">
                                            <h3 className="text-white">Students Crud App</h3>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
