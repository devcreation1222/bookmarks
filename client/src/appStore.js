import Freezer from 'freezer-js';

const Store = new Freezer({
    uiPage: 'Bookmarks',
    searchQuery: {
        activePage: 1,
        sortBy: 'title',
        sortAsc: true,
        searchStr: '',
        searchMode: '',
        searchTags: []
    }
});

const searchQueryMutations = {
    setActivePage(page) {
        Store.get().searchQuery.set({
            activePage: page
        });
    },
    setSortBy(key) {
        Store.get().searchQuery.set({
            sortBy: key,
            activePage: 1
        });
    },
    setSortDirection() {
        let direction = Store.get().searchQuery.sortAsc;
        
        Store.get().searchQuery.set({
            sortAsc: !direction,
            activePage: 1 
        });
    },
    setSearchParams(searchStr, searchMode, searchTags) {
        Store.get().searchQuery.set({
            activePage: 1,
            searchStr,
            searchMode,
            searchTags
        });
    }
};

export default {
    store: Store,
    getStore: () => {
        return Store.get()
    },
    setUiPage(page) {
        Store.get().set({
            uiPage: page
        });
    },
    searchQuery: searchQueryMutations
};