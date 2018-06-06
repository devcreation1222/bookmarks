import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import TagSelector from '../common/TagSelector';
import autoBind from 'react-autobind';

class AddTag extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tagsOptions: [],
            selectedTags: []
        };

        autoBind(this);
    }

    componentWillReceiveProps() {
        let tagsOptions = this.props.tags.map(tag => ({
            value: tag.id,
            label: tag.title
        }));

        this.setState({
            tagsOptions
        });
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

    save() {
        this.props.save(this.state.selectedTags);

        return this.setState({
            selectedTags: []
        });
    }

    close() {
        this.props.close();

        return this.setState({
            selectedTags: []
        });
    }

    updateSelectedTagState(field, value) {
        let selectedTags = this.state.tagsOptions.filter(to => {
            return value.indexOf(to.value) !== -1;
        });

        return this.setState({
            selectedTags
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.visible} onHide={this.close} keyboard={false} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Add tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{minHeight: 200}}>
                        <TagSelector
                            name="tags"
                            label="Select tags"
                            multi={true}
                            options={this.state.tagsOptions}
                            value={this.state.selectedTags}
                            onChange={this.updateSelectedTagState}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.save}>Update</Button>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

AddTag.propTypes = {
    save: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    tags: React.PropTypes.array,
    visible: React.PropTypes.bool
};

export default AddTag;