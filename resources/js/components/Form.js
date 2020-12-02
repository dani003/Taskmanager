import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'



class Form extends Component { 

    constructor(props) {
        super(props);
 
        this.state = {
          name: '',
          tasks: []
        };
        //bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }
 
    handleChange(e){
        this.setState({
            name: e.target.value
        });
        //console.log(e.target.value);
    }
    //handleSubmit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post('/tasks', {
                name: this.state.name
            })
            .then(response => {
                //console.log('from handle submit', response);
                this.setState({
                    tasks: [response.data, ...this.state.tasks],
                    name: ""
                });
            });
    }

    renderTasks(){
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name}{' '}
                        <span className="text-muted">
                            <br/>
                            by {task.user.name} | {task.updated_at.split('T').slice(1)}
                        </span>
                        <Link to={`/${task.id}/edit`} className="btn btn-sm btn-success float-right">
                            Update 
                        </Link>
                        <button 
                            onClick={() => this.handleDelete(task.id)} 
                            className="btn btn-sm btn-warning float-right">
                                Delete
                        </button>
                    </div>
                    <hr/>
                </div>
            </div>
        ));
    }

    // get all the tasks from backend 
    getTasks() {
        axios.get("/tasks").then(response => 
            this.setState({
                tasks: [...response.data.tasks]
            }) 
        );
    }
    
    //lifecycle method
    UNSAFE_componentWillMount() {
        this.getTasks();
    }

    //handle delete
    handleDelete(id){
        //remove from local state
        const isNotId = task => task.id !== id;
        const updateTasks = this.state.tasks.filter(isNotId);
        this.setState({ tasks: updateTasks });
        // make delete request to the backend
        axios.delete(`/tasks/${id}`); 
    }
   
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Task Create</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea 
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control" 
                                            rows="5"
                                            maxLength='50'
                                            placeholder="Create new task"
                                            required>
                                        </textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                                <hr/>
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Form;
