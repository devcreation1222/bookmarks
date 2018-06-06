import React, {Component} from 'react';
import autoBind from 'react-autobind';

class BookmarkStatistics extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        autoBind(this);
    }

    render() {
        return (
            <div>
                <div className="col-xs-12 title-row">
                    <h3>Statistics</h3>
                </div>
                <div className="col-xs-12 statistic-row">
                    All bookmarks: <strong>{this.props.totalBookmarksCount}</strong>
                </div>
                <div className="col-xs-12 statistic-row">
                    Tagged bookmarks: <strong>{this.props.taggedBookmarksCount}</strong>
                </div>
                <div className="col-xs-12 statistic-row">
                    Deleted bookmarks: <strong>{this.props.deletedBookmarksCount}</strong>
                </div>
            </div>
        );
    }
}

export default BookmarkStatistics;