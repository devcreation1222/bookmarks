import {Component} from 'react';
import autoBind from 'react-autobind';
import appStore from '../appStore';

class BaseComponent extends Component {
    constructor(props) {
        super(props);

        autoBind(this);
    }

    componentDidMount() {
        this._mounted = true;

        this.updateStateFromStore();

        appStore.store.on('update', () => {
            if (!this._mounted) return;

            this.updateStateFromStore();
        });
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    updateStateFromStore() {
    }

    get store() {
        return appStore.getStore();
    }
}

export default BaseComponent;