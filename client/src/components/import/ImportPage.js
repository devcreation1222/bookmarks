import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import toastr from 'toastr';
import Dropzone from 'react-dropzone';
import apiService from '../../services/apiService';
import './ImportPage.css';
import {Button} from 'react-bootstrap';

class ImportPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            added: 0,
            skipped: 0,
            fileToImport: null
        };

        autoBind(this);
    }

    onDrop(acceptedFiles) {
        if (acceptedFiles.length) {
            this.setState({
                fileToImport: acceptedFiles[0]
            });
        }
    }

    async importBookmarks() {
        let importResults = await apiService.importBookmarks(this.state.fileToImport);

        toastr.success('Bookmarks was imported successfully');
        
        this.setState({
            added: importResults.added,
            skipped: importResults.skipped
        })
    }

    render() {
        let resultClass = classnames({
            'col-xs-12': true,
            'form-group': true,
            'display-none': this.state.added === 0 && this.state.skipped === 0
        });

        return (
            <div id="import-div">
                <div className="col-xs-12 form-group">
                    <div className="col-xs-4 import-row">
                        From browser bookmarks - bookmarks will be merged
                    </div>

                    <div className="col-xs-3 col-sm-height" id="drop-zone">
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                            <div id="drop-message">Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </div>

                </div>

                <div className="col-xs-12 form-group">
                    {this.state.fileToImport &&
                        <div className="col-xs-5 import-row">
                            {this.state.fileToImport.name}
                            <Button onClick={this.importBookmarks} style={{marginLeft: 65}}>Import</Button>
                        </div>
                    }
                </div>

                <div className={resultClass}>
                    <h3>Import results</h3>

                    <p>Added: {this.state.added}</p>
                    <p>Skipped: {this.state.skipped}</p>
                </div>
            </div>
        );
    }
}

export default ImportPage;
