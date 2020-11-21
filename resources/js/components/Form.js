import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Form extends Component { 

    constructor(props) {
        super(props);
 
        this.state = {
          name: '',
          task: []
        };
        //bind
        this.handleChange = this.handleChange.bind(this);
      }
 
    handleChange(e){
        this.setState({
            name: e.target.value
        });
        //console.log(e.target.value);
    }

   
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">React Component</div>

                            <div className="card-body">
                                <form>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Form;
