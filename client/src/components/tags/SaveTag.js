import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import autoBind from 'react-autobind';

class SaveTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };

        autoBind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            errors: {}
        });
    }

    formIsValid() {
        let errors = {};
        let fieldIsRequired = 'Field is required.';
        let tag = this.props.tag;
    
        if (!tag.title) {
            errors.title = fieldIsRequired;
        }

        this.setState({errors: errors});

        return Object.keys(errors).length === 0;
    }

    save() {
        if (!this.formIsValid()) return;

        this.props.save();
    }

    render() {
        if (!this.props.tag) return null;

        let isNew = this.props.tag.id === undefined;

        let title = isNew ? 'Add tag' : 'Edit tag';
        let btnText = isNew ? 'Add': 'Update';
        
        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{minHeight: 275}}>
                        <TextInput
                            name="title"
                            label="Title"
                            value={this.props.tag.title}
                            onChange={this.props.onChange}
                            placeholder="Title"
                            error={this.state.errors.title}
                        />
                        <TextAreaInput
                            name="description"
                            rows={2}
                            isLargeText={true}
                            label="Description"
                            value={this.props.tag.description}
                            onChange={this.props.onChange}
                            placeholder="Description"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.save}>{btnText}</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

SaveTag.propTypes = {
    save: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    tag: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool
};

export default SaveTag;