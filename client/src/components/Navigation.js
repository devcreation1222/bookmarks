import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [
                {page: 'Bookmarks', icon: 'fa-home'},
                {page: 'Tags', icon: 'fa-tags'},
                {page: 'Import', icon: 'fa-download'},
                {page: 'Help', icon: 'fa-info-circle'}
            ]
        };

        autoBind(this);
    }

    onChange(page) {
        if (this.props.onPageChange) {
            this.props.onPageChange(page);
        }
    }

    render() {
        return (
            <div id="side-nav">
                <ul>
                    {this.state.links.map(link => {
                        let iconClass = classnames(['fa', 'fa-lg', link.icon]);
                        return (
                            <li key={link.page}>
                                <a className="nav" onClick={() => this.onChange(link.page)}>
                                    <i className={iconClass}></i>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default App;
