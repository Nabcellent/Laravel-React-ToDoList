import React from 'react';
import {Button, Card, CardBody, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import ReactDOM from "react-dom";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            taskModalData: {
                title: "",
                description: ""
            },
            newTaskModal: false,
            editTaskModal: false,
        }
    }

    toggleTaskModal(update = false) {
        const modal = update ? {editTaskModal: !this.state.editTaskModal} : {newTaskModal: !this.state.newTaskModal}
        console.log(modal)
        this.setState(modal)
    }

    componentWillMount() {
        this.readTasks()
    }

    createTask() {
        axios.post('http://localhost:8000/tasks/create', this.state.taskModalData).then(() => {
            let {tasks} = this.state;
            this.readTasks()

            this.setState({
                tasks, newTaskModal: false, taskModalData: {
                    title: "", description: "",
                }
            })
        })
    }

    readTasks() {
        axios.get('http://localhost:8000/tasks')
            .then(response => {
                this.setState({
                    tasks: response.data,
                })
            });
    }

    updateTask() {
        let {id, title, description} = this.state.taskModalData;

        axios.put('http://localhost:8000/tasks/update/' + id, {title, description})
            .then(() => {
                this.readTasks()

                this.setState({
                    newTaskModal: false, taskModalData: {
                        id: "", title: "", description: "",
                    }
                })
            })
    }

    editTask(task) {
        const {id, title, description} = task;

        this.setState({
            taskModalData: {id, title, description},
            editTaskModal: !this.state.editTaskModal
        })
    }

    deleteTask(id) {
        axios.delete('http://localhost:8000/tasks/remove/' + id)
            .then(() => this.readTasks())
    }

    render() {
        let tasks = this.state.tasks.map(task => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                                onClick={this.editTask.bind(this, task)}>Edit</Button>
                        <Button color="outline-danger" size="sm"
                                onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
                    </td>
                </tr>
            )
        });

        return (
            <div className="App container py-5">
                <Card className="shadow">
                    <CardBody>
                        <h2 className="text-center">My ToDoList App</h2>
                        <div className="text-right">
                            <Button color="danger" onClick={this.toggleTaskModal.bind(this, false)}>Create Task</Button>
                        </div>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.newTaskModal} toggle={this.toggleTaskModal.bind(this, false)}>
                    <Form>
                        <ModalHeader toggle={this.toggleTaskModal.bind(this, false)}>Create a new Task</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input value={this.state.taskModalData.title}
                                       onChange={(e) => {
                                           let {taskModalData} = this.state;
                                           taskModalData.title = e.target.value;
                                           this.setState({taskModalData})
                                       }}/>
                                <FormFeedback>You will not be able to see this</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input value={this.state.taskModalData.description}
                                       onChange={(e) => {
                                           let {taskModalData} = this.state;
                                           taskModalData.description = e.target.value;
                                           this.setState({taskModalData})
                                       }}/>
                                <FormFeedback>You will not be able to see this</FormFeedback>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleTaskModal.bind(this, false)}>Cancel</Button>
                            <Button color="primary" onClick={this.createTask.bind(this)}>Create Task</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                <Modal isOpen={this.state.editTaskModal} toggle={this.toggleTaskModal.bind(this)}>
                    <Form>
                        <ModalHeader toggle={this.toggleTaskModal.bind(this)}>Edit Task</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input value={this.state.taskModalData.title}
                                       onChange={(e) => {
                                           let {taskModalData} = this.state;
                                           taskModalData.title = e.target.value;
                                           this.setState({taskModalData})
                                       }}/>
                                <FormFeedback>You will not be able to see this</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input value={this.state.taskModalData.description}
                                       onChange={(e) => {
                                           let {taskModalData} = this.state;
                                           taskModalData.description = e.target.value;
                                           this.setState({taskModalData})
                                       }}/>
                                <FormFeedback>You will not be able to see this</FormFeedback>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleTaskModal.bind(this)}>Cancel</Button>
                            <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index/>, document.getElementById('index'));
}
