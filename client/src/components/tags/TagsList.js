import React, {Component} from 'react';
import autoBind from 'react-autobind';
import ListAction from '../common/ListAction';
import Confirm from '../common/Confirm';
import TagItem from './TagItem';
import SaveTag from './SaveTag';
import './TagsList.css';
import apiService from '../../services/apiService';
import toastr from 'toastr';
import classnames from 'classnames';

class TagsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            tagToDeleteId: null,
            tagToEdit: null
        };

        autoBind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        let tags = await apiService.getTags();
        
        this.setState({
            tags
        });
    }

    addTag() {
        this.setState({
            tagToEdit: Object.assign({}, {})
        });
    }

    editTag(tag) {
        this.setState({
            tagToEdit: Object.assign({}, tag)
        });
    }

    cancelEditTag() {
        this.setState({
            tagToEdit: null
        });
    }

    updateTagState(field, value) {
        let tag = this.state.tagToEdit;

        tag[field] = value;

        return this.setState({tagToEdit: tag});
    }

    async saveTag() {
        await apiService.saveTag(this.state.tagToEdit);
        
        toastr.success('Tag was saved');

        await this.loadData();

        this.setState({
            tagToEdit: null
        });
    }

    async deleteTag() {
        await apiService.deleteTag(this.state.tagToDeleteId);
        
        toastr.success('Tag was deleted');

        this.setState({
            tagToDeleteId: null
        });

        await this.loadData();
    }

    confirmDeleteTag(id) {
        this.setState({
            tagToDeleteId: id
        });
    }

    cancelDeleteTag() {
        this.setState({
            tagToDeleteId: null
        });
    }

    get anyTags() {
        let tags = this.state.tags;
        return tags && tags.length;
    }

    render() {
        let bodyHeaderClass = classnames({
            'tag-list-body-header': true,
            'display-none': !this.anyTags
        });

        let bodyClass = classnames({
            'tag-list-body': true,
            'display-none': !this.anyTags
        });

        let messageClass = classnames({
            'display-none': this.anyTags
        });

        let deleteConfirmVisible = this.state.tagToDeleteId ? true : false;
        let editTagVisible = this.state.tagToEdit ? true : false;

        return (
            <div>
                <div className="tag-list-header">
                    <ListAction
                        action={this.addTag}
                        tooltip="Add new tag."
                        icon="fa-plus"
                    />
                </div>

                <div className={bodyHeaderClass}>
                    <div className="tag-row">
                        <div className="tag-cell title">Title</div>
                        <div className="tag-cell description">Description</div>
                        <div className="tag-cell tools"></div>
                    </div>
                </div>

                <div className={bodyClass}>
                    {
                        this.state.tags.map(tag => {
                            return <TagItem key={tag.id}
                                            tag={tag}
                                            editTagAction={this.editTag}
                                            deleteTagAction={this.confirmDeleteTag}
                            />
                        })
                    }
                </div>

                <div id="info-message" className={messageClass}>You do not have any tags.</div>

                <Confirm visible={deleteConfirmVisible} action={this.deleteTag} close={this.cancelDeleteTag}/>

                <SaveTag visible={editTagVisible} tag={this.state.tagToEdit} save={this.saveTag}
                         close={this.cancelEditTag} onChange={this.updateTagState}/>
            </div>
        );
    }
}

export default TagsList;
