import React, {Component} from 'react';
import autoBind from 'react-autobind';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        autoBind(this);
    }

    render() {
        return (
            <div>
                TODO:{this.props.children}
            </div>
        );
    }
}

export default Todo;
