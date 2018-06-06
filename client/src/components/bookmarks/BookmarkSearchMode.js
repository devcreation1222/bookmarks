import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './BookmarkSearchMode.css';

class BookmarkSearchMode extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        autoBind(this);
    }

    onToggle() {
        if (this.props.onToggle) this.props.onToggle(this.props.id);
    }

    render() {
        let active = this.props.searchMode === this.props.id;

        let headerClass = classnames({
            'header': true,
            'col-xs-12': true,
            'header-active': active
        });

        let iconClass = classnames({
            'fa': true,
            'fa-check-circle-o': active,
            'fa-circle-o': !active
        });

        return (
            <div className={headerClass}>
                <i className={iconClass}></i>

                <span onClick={this.onToggle}>{this.props.title}</span>

                {active ? (
                    <div className="content">
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default BookmarkSearchMode;