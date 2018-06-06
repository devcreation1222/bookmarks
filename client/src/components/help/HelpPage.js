import React, {Component} from 'react';
import autoBind from 'react-autobind';
import ReactMarkdown from 'react-markdown';
import helpContent from './help.md.js';

class BookmarksPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        autoBind(this);
    }

    render() {
        return (
            <div className="help-block">
                <ReactMarkdown source={helpContent}></ReactMarkdown>
            </div>
        );
    }
}

export default BookmarksPage;
