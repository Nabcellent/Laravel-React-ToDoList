/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Example');

import React from "react";
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Index";
import ToDoIndex from "./components/todo/Index";
import StudentIndex from "./components/students/Index";
import StudentCreate from "./components/students/Create";
import StudentUpdate from "./components/students/Update";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/todo" component={ToDoIndex}/>
                <Route exact path="/students" component={StudentIndex}/>
                <Route exact path="/students/create" component={StudentCreate}/>
                <Route exact path="/students/edit/:id" component={StudentUpdate}/>
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
