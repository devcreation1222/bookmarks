import React, {Component} from 'react';
import {Pagination, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './BookmarksList.css';
import ListAction from '../common/ListAction';
import Confirm from '../common/Confirm';
import BookmarkItem from './BookmarkItem';
import SaveBookmark from './SaveBookmark';
import AddTag from './AddTag';
import apiService from '../../services/apiService';
import toastr from 'toastr';
import settings from '../../services/settingsService';

class BookmarksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmarkToEdit: null,
            bookmarkToDeleteId: null,
            bookmarkToRestore: null,
            selectedBookmarks: [],
            allSelected: false,
            showConfirm: false,
            showAddTagModal: false,
            selectedTags: []
        };

        autoBind(this);
    }

    componentWillReceiveProps() {
        this.setState({
           selectedBookmarks: []
        });
    }

    loadData() {
        if (this.props.onLoadData){
            this.props.onLoadData();
        }
    }

    loadTags() {
        if (this.props.onLoadTags){
            this.props.onLoadTags();
        }
    }

    pageSelection(eventKey) {
        if (this.props.onPageChange) {
            this.props.onPageChange(eventKey);
        }
    }

    sortBy(key) {
        if (this.props.onSortByChange) {
            this.props.onSortByChange(key);
        }
    }
    
    sortDirection(key) {
        if (this.props.onSortDirectionChange) {
            this.props.onSortDirectionChange();
        }
    }

    addBookmark() {
        this.setState({
            bookmarkToEdit: {
                title: '',
                url: '',
                tags: []
            }
        });
    }

    editBookmark(bookmark) {
        this.setState({
            bookmarkToEdit: Object.assign({}, bookmark)
        });
    }

    editSelectedBookmark() {
        let selectedBookmarks = this.state.selectedBookmarks;

        if(selectedBookmarks.length === 1) {
            let bookmarks = this.props.bookmarks.filter(b => selectedBookmarks.indexOf(b.id) !== -1);

            if(bookmarks) {
                this.setState({
                    bookmarkToEdit: Object.assign({}, bookmarks[0])
                });
            }
        }
    }

    async addTagForBookmarks(selectedTags) {
        await apiService.addTagsForMultipleBookmarks(this.state.selectedBookmarks, selectedTags);

        toastr.success('Tags were added');

        await this.loadData();

        this.setState({
            showAddTagModal: false,
            allSelected: false,
            selectedBookmarks: []
        });
    }

    displayAddTagModal() {
        this.setState({
            showAddTagModal: true
        });
    }

    cancelAddTag() {
        this.setState({
            showAddTagModal: false
        });
    }

    async deleteBookmarks() {
        await apiService.deleteMultipleBookmarks(this.state.selectedBookmarks);

        toastr.success('Bookmarks were deleted');

        await this.loadData();

        this.setState({
            showConfirm: false,
            selectedBookmarks: [],
            allSelected: false
        });
    }

    confirmDeleteBookmarks() {
        this.setState({
            showConfirm: true
        });
    }

    cancelDeleteBookmarks() {
        this.setState({
            showConfirm: false
        });
    }

    async deleteBookmark() {
        await apiService.deleteBookmark(this.state.bookmarkToDeleteId);

        toastr.success('Bookmark was deleted');

        await this.loadData();

        this.setState({
            bookmarkToDeleteId: null
        });
    }

    cancelDeleteBookmark() {
        this.setState({
            bookmarkToDeleteId: null
        });
    }

    confirmDeleteBookmark(id) {
        this.setState({
            bookmarkToDeleteId: id
        });
    }

    async saveBookmark() {
        await apiService.saveBookmark(this.state.bookmarkToEdit);
        
        toastr.success('Bookmark was saved');

        await this.loadData();

        this.setState({
            bookmarkToEdit: null
        });
    }

    cancelEditBookmark() {
        this.setState({
            bookmarkToEdit: null
        });
    }

    updateBookmarkState(field, value) {
        let bookmark = this.state.bookmarkToEdit;

        if (field === 'tags') {
            let tags = this.props.tags.filter(t => value.indexOf(t.id) !== -1);
            value = tags;
        }

        bookmark[field] = value;

        return this.setState({bookmarkToEdit: bookmark});
    }

    async restoreBookmark() {
        await apiService.restoreBookmark(this.state.bookmarkToRestore);
        
        toastr.success('Bookmark was restored');

        await this.loadData();

        this.setState({
            bookmarkToRestore: null
        });
    }

    cancelRestoreBookmark() {
        this.setState({
            bookmarkToRestore: null
        });
    }

    confirmRestoreBookmark(id) {
        this.setState({
            bookmarkToRestore: id
        });
    }

    selectAllBookmarks() {
        this.setState({
            selectedBookmarks: [],
            allSelected: false
        });

        if (!this.state.allSelected) {
            let selectedBookmarks = [];

            for (let bookmark of this.props.bookmarks) {
                selectedBookmarks.push(bookmark.id);
            }

            this.setState({
                selectedBookmarks: selectedBookmarks,
                allSelected: true
            });
        }
    }

    selectBookmark(bookmarkId) {
        let selectedBookmarks = this.state.selectedBookmarks;

        let index = selectedBookmarks.indexOf(bookmarkId);

        if (index === -1) {
            selectedBookmarks.push(bookmarkId);
        } else {
            selectedBookmarks.splice(index, 1);
        }

        this.setState({
            selectedBookmarks
        });
    }

    get anyBookmarks() {
        let bookmarks = this.props.bookmarks;
        return bookmarks && bookmarks.length;
    }

    get onlyOneSelected() {
        return this.state.selectedBookmarks.length !== 1;
    }

    get noSelection() {
        return this.state.selectedBookmarks.length === 0;
    }

    render() {
        let pageNumber = Math.ceil(this.props.total / settings.PAGE_SIZE);

        let sortByOptions = [
            {key: 'title', text: 'Title'},
            {key: 'lastEditDate', text: 'Last edit'},
            {key: 'creationDate', text: 'Created date'}
        ];

        let deleteConfirmVisible = this.state.bookmarkToDeleteId ? true : false;
        let editBookmarkVisible = this.state.bookmarkToEdit ? true : false;
        let restoreConfirmVisible = this.state.bookmarkToRestore ? true : false;

        let iconClass = classnames({
            'fa': true,
            'fa-arrow-down': this.props.searchQuery.sortAsc,
            'fa-arrow-up': !this.props.searchQuery.sortAsc
        });

        return (
            <div>
                {this.anyBookmarks ? (
                    <div>
                        <div className="bookmark-list-header">
                            <div className="bookmarks-actions">
                                <ListAction
                                    action={this.addBookmark}
                                    tooltip="Add new bookmark."
                                    icon="fa-plus"
                                />

                                <ListAction
                                    action={this.editSelectedBookmark}
                                    tooltip="Edit bookmark"
                                    icon="fa-pencil"
                                    disabled={this.onlyOneSelected}
                                />

                                <ListAction
                                    action={this.displayAddTagModal}
                                    tooltip="Add tag for multiple bookmarks."
                                    icon="fa-tag"
                                    disabled={this.noSelection}
                                />

                                <ListAction
                                    action={this.confirmDeleteBookmarks}
                                    tooltip="Delete multiple bookmarks."
                                    icon="fa-trash-o"
                                    disabled={this.noSelection}
                                />
                            </div>

                            <div>
                                <Pagination
                                    bsSize="medium"
                                    first
                                    last
                                    ellipsis
                                    boundaryLinks
                                    maxButtons={8}
                                    items={pageNumber}
                                    activePage={this.props.searchQuery.activePage}
                                    onSelect={this.pageSelection}
                                />
                            </div>

                            <div id="sort-order">
                                <ButtonToolbar>
                                    <DropdownButton bsSize="small" title="Sort By:" id="sort-by-dropdown">
                                        {sortByOptions.map(item => {
                                            return (
                                                <MenuItem key={item.key} onClick={() => this.sortBy(item.key)}
                                                          active={this.props.searchQuery.sortBy === item.key}>{item.text}</MenuItem>
                                            )
                                        })}
                                    </DropdownButton>
                                </ButtonToolbar>

                                <i className={iconClass} style={{marginLeft: 8}} onClick={() => this.sortDirection()}
                                   aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className="bookmark-list-body-header">
                            <div className="bookmark-row">
                                <div className="bookmark-cell checkbox">
                                    <input type="checkbox" onChange={this.selectAllBookmarks}
                                           checked={this.state.allSelected}/>
                                </div>
                                <div className="bookmark-cell title">Title</div>
                                <div className="bookmark-cell url">Url</div>
                                <div className="bookmark-cell tags">Tags</div>
                                <div className="bookmark-cell tools"></div>
                                <div className="bookmark-cell info"></div>
                            </div>
                        </div>

                        <div className="bookmark-list-body">
                            {
                                this.props.bookmarks.map(bookmark => {
                                    return <BookmarkItem key={bookmark.id}
                                                         bookmark={bookmark}
                                                         selectedBookmarks={this.state.selectedBookmarks}
                                                         editBookmarkAction={this.editBookmark}
                                                         deleteBookmarkAction={this.confirmDeleteBookmark}
                                                         restoreBookmarkAction={this.confirmRestoreBookmark}
                                                         selectBookmarkAction={this.selectBookmark}
                                    />
                                })
                            }
                        </div>
                    </div>
                ):(
                    <div>
                        <div style={{textAlign: 'center', marginTop: 12}}>
                            <ListAction action={this.addBookmark}
                                        tooltip="Add new bookmark."
                                        icon="fa-plus" />
                        </div>

                        <div id="message">No bookmarks.</div>
                    </div>
                )}


                <Confirm visible={this.state.showConfirm} action={this.deleteBookmarks} close={this.cancelDeleteBookmarks}/>

                <Confirm visible={deleteConfirmVisible} action={this.deleteBookmark} close={this.cancelDeleteBookmark}/>
                
                <Confirm visible={restoreConfirmVisible} action={this.restoreBookmark} close={this.cancelRestoreBookmark}/>

                <SaveBookmark visible={editBookmarkVisible} bookmark={this.state.bookmarkToEdit} tags={this.props.tags}
                              save={this.saveBookmark} close={this.cancelEditBookmark}
                              onChange={this.updateBookmarkState} onLoad={this.loadTags} />

                <AddTag visible={this.state.showAddTagModal} tags={this.props.tags}
                        save={this.addTagForBookmarks} close={this.cancelAddTag} />
            </div>
        );
    }
}

export default BookmarksList;
