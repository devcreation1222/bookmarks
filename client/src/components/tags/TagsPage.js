import React, {Component} from 'react';
import autoBind from 'react-autobind';
import TagsList from './TagsList';
import './TagsPage.css';

class TagsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        autoBind(this);
    }

    render() {
        return (
            <div className="container">
                <div id="tag-list">
                    <TagsList></TagsList>
                </div>
            </div>
        );
    }
}

export default TagsPage;
