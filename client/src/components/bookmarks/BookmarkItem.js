import React, {Component} from 'react';
import './BookmarkItem.css';
import moment from 'moment';

const MAX_URL_DISPLAY_LENGTH = 50;

class BookmarkItem extends Component {
    static getTagsTooltip(tags) {
        let result = '';

        if(tags && tags.length) {
            for (let tag of tags) {
                result += `- ${tag.title} \n`;
            }
        }

        return result;
    }

    getBookmarkTooltip(bookmark, tags){
        let result = '';

        let date = '';
        if (bookmark.creationDate) {
            let jsDate = new Date(bookmark.creationDate);
            date = moment(jsDate).format('D MMM YYYY');
        }

        result += `Created: ${date} \n`;

        if (bookmark.originalPath) {
            result += `Original path: ${bookmark.originalPath}`;
        }

        result += '\n';

        if (tags && tags.length) {
            result += `Tags: \n`;

            for (let tag of tags) {
                result += `      - ${tag.title} \n`;
            }
        }

        return result;
    }

    static isChecked(bookmarkId, selectedBookmarksIds) {
        let isChecked = false;

        for (let id of selectedBookmarksIds) {
            if(bookmarkId === id) {
                isChecked = true;
            }
        }

        return isChecked;
    }

    render() {

        let tags = this.props.bookmark.tags;

        let tagsTooltip = BookmarkItem.getTagsTooltip(tags);

        let bookmarkTooltip = this.getBookmarkTooltip(this.props.bookmark, tags);

        let shortenedUrl = this.props.bookmark.url;

        if (shortenedUrl.length > MAX_URL_DISPLAY_LENGTH) {
            shortenedUrl = shortenedUrl.substring(0, MAX_URL_DISPLAY_LENGTH) + '...';
        }

        let isChecked = BookmarkItem.isChecked(this.props.bookmark.id, this.props.selectedBookmarks);

        let editClick = () => {
            this.props.editBookmarkAction(this.props.bookmark);
        };

        let deleteClick = () => {
            this.props.deleteBookmarkAction(this.props.bookmark.id);
        };

        let restoreClick = () => {
            this.props.restoreBookmarkAction(this.props.bookmark.id);
        };
        
        let handleChange = () => {
            this.props.selectBookmarkAction(this.props.bookmark.id);  
        };

        return (
            <div className="bookmark-row">
                <div className="bookmark-cell checkbox">
                    <input type="checkbox" id={this.props.bookmark.id} value={this.props.bookmark.id}
                           checked={isChecked} onChange={handleChange} />
                </div>

                <div className="bookmark-cell title">
                    <label htmlFor={this.props.bookmark.id} data-toggle="tooltip" title={bookmarkTooltip}>
                        {this.props.bookmark.title}
                    </label>
                </div>

                <div className="bookmark-cell url">
                    <a href={this.props.bookmark.url} target="_blank" data-toggle="tooltip" title={this.props.bookmark.url}>
                        {shortenedUrl}
                    </a>
                </div>

                <div className="bookmark-cell tags">
                    {this.props.bookmark.isTagged ? (
                        <span data-toggle="tooltip" title={tagsTooltip}>
                            <i className="fa fa-search fa-flip-horizontal fa-lg"></i>
                        </span>
                    ) : <span data-toggle="tooltip" title="No tags for this bookmark.">
                            <i className="fa fa-minus fa-lg"></i>
                        </span>
                    }
                </div>

                <div className="bookmark-cell tools">
                    <div id="buttons-div">
                        <span>
                            <a onClick={editClick} title="Edit bookmark"><i className="fa fa-pencil fa-lg"></i></a>
                        </span>

                        <span className="actions-panel">
                            {this.props.bookmark.isDeleted ? (
                                <a onClick={restoreClick} title="Restore bookmark">
                                    <i className="fa fa-undo"></i>
                                </a>
                            ) : <a onClick={deleteClick} title="Delete bookmark">
                                    <i className="fa fa-trash-o fa-lg"></i>
                                </a>
                            }

                            <span data-toggle="tooltip" title={bookmarkTooltip}>
                                <i className="fa fa-exclamation-circle fa-lg"></i>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

BookmarkItem.propTypes = {
    bookmark: React.PropTypes.object.isRequired,
    selectedBookmarks: React.PropTypes.array.isRequired,
    editBookmarkAction: React.PropTypes.func.isRequired,
    deleteBookmarkAction: React.PropTypes.func.isRequired,
    restoreBookmarkAction: React.PropTypes.func.isRequired,
    selectBookmarkAction: React.PropTypes.func.isRequired
};

export default BookmarkItem;