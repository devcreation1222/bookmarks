import BaseComponent from './BaseComponent';
import React from 'react';
import '../App.css';
import Navigation from './Navigation';
import BookmarksPage from './bookmarks/BookmarksPage';
import TagsPage from './tags/TagsPage';
import ImportPage from './import/ImportPage';
import HelpPage from './help/HelpPage';
import appStore from '../appStore';

class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            page: 'Bookmarks'
        };
    }

    updateStateFromStore() {
        this.setState({
            page: this.store.uiPage
        })
    }

    onPageChange(page) {
        appStore.setUiPage(page);
    }

    renderPage() {
        switch (this.store.uiPage){
            case 'Bookmarks':
                return (
                    <BookmarksPage/>
                );
            case 'Tags':
                return (
                    <TagsPage/>
                );
            case 'Import':
                return (
                    <ImportPage/>
                );
            case 'Help':
                return (
                    <HelpPage/>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div id="wrapper">
                <Navigation onPageChange={this.onPageChange}></Navigation>

                <div id="main">
                    {this.renderPage()}
                </div>
            </div>
        );
    }
}

export default App;
