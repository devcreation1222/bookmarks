import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import TagSelector from '../common/TagSelector';
import autoBind from 'react-autobind';
import SaveTag from '../tags/SaveTag';
import apiService from '../../services/apiService';
import toastr from 'toastr';

class SaveBookmark extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tagsOptions: [],
            tagToEdit: null,
            errors: {}
        };

        autoBind(this);
    }

    componentWillMount() {
        document.onkeyup = this.onKeyDown;
    }

    componentWillUnmount() {
        document.onkeyup = null;
    }

    onKeyDown(e) {
        if (e.code === 'Enter' && e.ctrlKey) {
            this.save();
        }
    }

    componentWillReceiveProps(nextProps) {
        let tagsOptions = nextProps.tags.map(tag => ({
            value: tag.id,
            label: tag.title
        }));

        this.setState({
            tagsOptions,
            errors: {}
        });
    }

    formIsValid() {
        let errors = {};
        let fieldIsRequired = 'Field is required.';
        let bookmark = this.props.bookmark;

        if (!bookmark.title) {
            errors.title = fieldIsRequired;
        }

        if (!bookmark.url) {
            errors.url = fieldIsRequired;
        }

        if (!this.validateUrl(bookmark.url)) {
            errors.url = 'Url is not valid.';
        }

        this.setState({errors: errors});

        return Object.keys(errors).length === 0;
    }

    validateUrl (url) {
        return /^(http:\/\/|https:\/\/)(.{4,})$/.test(url);
    }

    save() {
        if (!this.formIsValid()) return;

        this.props.save();
    }

    showTagModal() {
        this.setState({
            tagToEdit: Object.assign({}, {})
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

        if (this.props.onLoad) {
            this.props.onLoad();
        }

        this.setState({
            tagToEdit: null
        });
    }

    render() {
        let bookmark = this.props.bookmark;

        if (!bookmark) return null;

        let isNew = bookmark.id === undefined;

        let title = isNew ? 'Add bookmark' : 'Edit bookmark';
        let btnText = isNew ? 'Add' : 'Update';

        let tagIds = bookmark.tags.map(t => t.id);

        let selectedTags = this.state.tagsOptions.filter(to => {
            return tagIds.indexOf(to.value) !== -1;
        });

        let editTagVisible = this.state.tagToEdit ? true : false;

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close} keyboard={false} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextAreaInput
                            name="title"
                            rows={2}
                            isLargeText={true}
                            label="Title"
                            value={this.props.bookmark.title}
                            onChange={this.props.onChange}
                            placeholder="Title"
                            error={this.state.errors.title}
                        />

                        <TextInput
                            name="url"
                            label="Url"
                            value={this.props.bookmark.url}
                            onChange={this.props.onChange}
                            placeholder="Url"
                            error={this.state.errors.url}
                        />

                        <TagSelector
                            name="tags"
                            label="Tags"
                            multi={true}
                            options={this.state.tagsOptions}
                            value={selectedTags}
                            onChange={this.props.onChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.showTagModal}>Add new tag</Button>
                        <Button bsStyle="primary" onClick={this.save}>{btnText}</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <SaveTag visible={editTagVisible} tag={this.state.tagToEdit} save={this.saveTag}
                         close={this.cancelEditTag} onChange={this.updateTagState} />
            </div>
        );
    }
}

SaveBookmark.propTypes = {
    save: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    bookmark: React.PropTypes.object,
    tags: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
    onLoad: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool
};

export default SaveBookmark;