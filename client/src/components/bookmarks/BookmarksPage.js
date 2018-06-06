import React from 'react';
import BaseComponent from '../BaseComponent';
import BookmarksSearchFilter from './BookmarksSearchFilter';
import BookmarksList from './BookmarksList';
import BookmarkStatistics from './BookmarkStatistics';
import './BookmarksPage.css';
import apiService from '../../services/apiService';
import settings from '../../services/settingsService';
import appStorage from '../../appStore';

class BookmarksPage extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            bookmarks: [],
            tags: [],
            total: 0,
            searchQuery: {
                ...this.store.searchQuery
            },
            stat: {
                totalBookmarksCount: 0,
                taggedBookmarksCount: 0,
                deletedBookmarksCount: 0
            }
        };
    }

    updateStateFromStore() {
        this.setState({
            searchQuery: {
                ...this.store.searchQuery
            }
        });
    }

    async componentDidMount() {
        super.componentDidMount();

        let tags = await apiService.getTags();

        this.setState({
            tags
        }, () => {
            this.loadData();
        });

        await this.loadStatistic();

        appStorage.store.on('update', () => {
            if (!this._mounted) return;

            this.setState({
                searchQuery: appStorage.getStore().searchQuery
            }, () => {
                this.loadData();
            });
        });
    }

    async loadData() {
        let data = await apiService.getBookmarks(this.state.searchQuery);

        let page = this.state.searchQuery.activePage;
        let pageNumber = Math.ceil(data.total / settings.PAGE_SIZE);

        //when delete the last element on the last page or add first element
        if (page > pageNumber || (page === 0 && data.total === 1)) {
            page = pageNumber;

            return appStorage.searchQuery.setActivePage(page);
        }

        this.setState({
            bookmarks: data.dataItems,
            total: data.total
        });

        this.loadStatistic();
    }

    async loadTags() {
        let tags = await apiService.getTags();

        this.setState({
            tags
        });
    }

    async loadStatistic() {
        let stat = await apiService.getStatistic();

        this.setState({
            stat: {
                ...this.state.stat,
                totalBookmarksCount: stat.totalBookmarksCount,
                taggedBookmarksCount: stat.taggedBookmarksCount,
                deletedBookmarksCount: stat.deletedBookmarksCount
            }
        });
    }

    onPageChange(page) {
        appStorage.searchQuery.setActivePage(page);
    }

    onSortByChange(key) {
        appStorage.searchQuery.setSortBy(key);
    }

    onSortDirectionChange() {
        appStorage.searchQuery.setSortDirection();
    }

    onSearch(searchStr, searchMode, searchTags) {
        appStorage.searchQuery.setSearchParams(searchStr, searchMode, searchTags);
    }

    render() {
        return (
            <div className="container">
                <div id="search">
                    <BookmarkStatistics {...this.state.stat}/>

                    <BookmarksSearchFilter tags={this.state.tags}
                                           total={this.state.total}
                                           onSearch={this.onSearch}/>
                </div>
                <div id="bookmarks-list">
                    <BookmarksList bookmarks={this.state.bookmarks}
                                   total={this.state.total}
                                   tags={this.state.tags}
                                   searchQuery={this.state.searchQuery}
                                   onPageChange={this.onPageChange}
                                   onSortByChange={this.onSortByChange}
                                   onSortDirectionChange={this.onSortDirectionChange}
                                   onLoadData={this.loadData}
                                   onLoadTags={this.loadTags}
                    />
                </div>
            </div>
        );
    }
}

export default BookmarksPage;
