import React from 'react';
import BaseComponent from '../BaseComponent';
import './BookmarksSearchFilter.css';
import BookmarkSearchMode from './BookmarkSearchMode';
import TagSelector from '../common/TagSelector';

class BookmarksSearchFilter extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchStr: '',
            searchMode: '',
            searchModeOptions: {
                noTags: 'no_tags',
                tagSelection: 'tag_selection',
                deleted: 'deleted'
            },
            selectedTags: [],
            tagsOptions: []
        };
    }

    updateStateFromStore() {
        let searchQuery = this.store.searchQuery;

        this.setState({
            searchMode: searchQuery.searchMode,
            searchStr: searchQuery.searchStr,
            selectedTags: searchQuery.searchTags
        })
    }

    componentWillReceiveProps(nextProps) {
        let tagsOptions = nextProps.tags.map(tag => ({
            value: tag.id,
            label: tag.title
        }));

        this.setState({
            tagsOptions
        });
    }

    search() {
        this.props.onSearch(this.state.searchStr, this.state.searchMode, this.state.selectedTags);
    }

    clear() {
        this.setState({
            searchStr: '',
            searchMode: '',
            selectedTags: []
        }, () => {
            this.search();
        });
    }

    toggleSearchMode(id) {
        for (let key of Object.keys(this.state.searchModeOptions)) {
            let searchModeItem = this.state.searchModeOptions[key];
            if (searchModeItem === id) {
                this.setState({
                    searchMode: searchModeItem
                });
                break;
            }
        }
    }

    updateState(field, value) {
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
                <div className="col-xs-12 title-row">
                    <h3>Search</h3>
                </div>

                <div className="form-group">
                    <h4 className="col-xs-12">Filter:</h4>
                    <div className="col-xs-12">
                        <input type="text"
                               value={this.state.searchStr}
                               className="form-control"
                               onChange={(event) => {
                                   this.setState({
                                       searchStr: event.target.value
                                   });
                               }}
                               onKeyPress={(target) => {
                                   if (target.charCode === 13) {
                                       this.search();
                                   }
                               }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <h4 className="col-xs-12" style={{marginTop: 30}}>Mode:</h4>

                    <BookmarkSearchMode title="New bookmarks (no tags)"
                                        id={this.state.searchModeOptions.noTags}
                                        searchMode={this.state.searchMode}
                                        onToggle={this.toggleSearchMode}>
                        Search for bookmarks with no tags. Useful when soring newly imported bookmarks.
                    </BookmarkSearchMode>
                    <BookmarkSearchMode title="Tags selection"
                                        id={this.state.searchModeOptions.tagSelection}
                                        searchMode={this.state.searchMode}
                                        onToggle={this.toggleSearchMode}>

                        <TagSelector
                            name="tags"
                            label="Select tags:"
                            multi={true}
                            options={this.state.tagsOptions}
                            value={this.state.selectedTags}
                            onChange={this.updateState}
                        />
                    </BookmarkSearchMode>
                    <BookmarkSearchMode title="Deleted bookmarks"
                                        id={this.state.searchModeOptions.deleted}
                                        searchMode={this.state.searchMode}
                                        onToggle={this.toggleSearchMode}>
                        Search for deleted bookmarks.
                    </BookmarkSearchMode>
                </div>

                <div className="form-group">
                    <div className="col-xs-12 results-row">
                        Results found: <strong>{this.props.total}</strong>
                    </div>
                    <div className="col-xs-12 search-actions">
                        <button id="btn-search" className="btn btn-primary" onClick={this.search}>Search</button>
                        <button id="btn-clear" className="btn btn-default" onClick={this.clear}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookmarksSearchFilter;
