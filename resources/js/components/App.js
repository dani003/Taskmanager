import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.js';
import TaskEdit from './TaskEdit.js';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
  
  function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  }

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
        <div>
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/:id/edit">About</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            </ul>

            <hr />
            <Switch>
                <Route exact path="/">
                    <Form />
                </Route>
                <Route path="/:id/edit">
                    <TaskEdit />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
        , document.getElementById('root'));
}
