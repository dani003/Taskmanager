import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.js';

function App() {

        return (
            <div className="container">
                <Form></Form>
            </div>
        );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
