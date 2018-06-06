import React, {Component} from 'react';

class TagItem extends Component {
    render() {
        let editClick = () => {
            this.props.editTagAction(this.props.tag);
        };

        let deleteClick = () => {
            this.props.deleteTagAction(this.props.tag.id);
        };

        return (
            <div className="tag-row">
                <div className="tag-cell title">{this.props.tag.title}</div>
                <div className="tag-cell description">{this.props.tag.description}</div>
                <div className="tag-cell tools">
                    <div>
                        <span>
                            <a title="Edit tag" onClick={editClick}>
                                <i className="fa fa-pencil fa-lg"></i>
                            </a>
                        </span>

                        <span style={{marginLeft: 8}}>
                            <a title="Delete tag" onClick={deleteClick}>
                                <i className="fa fa-trash-o fa-lg"></i>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

TagItem.propTypes = {
    tag: React.PropTypes.object.isRequired,
    editTagAction: React.PropTypes.func.isRequired,
    deleteTagAction: React.PropTypes.func.isRequired
};

export default TagItem;