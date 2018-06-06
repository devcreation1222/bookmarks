import httpHelper from '../helpers/httpHelper';
import settingsService from './settingsService';

export default {
    getBookmarks,
    saveBookmark,
    deleteBookmark,
    restoreBookmark,
    deleteMultipleBookmarks,
    addTagsForMultipleBookmarks,
    getStatistic,
    getTags,
    deleteTag,
    saveTag,
    exportBookmarks,
    importBrowserBookmarks,
    importBackupBookmarks,
    importBookmarks
}

function getBookmarks(searchQuery) {
    let data = {
        activePage: searchQuery.activePage,
        sortBy: searchQuery.sortBy,
        sortAsc: searchQuery.sortAsc,
        searchStr: searchQuery.searchStr,
        searchMode: searchQuery.searchMode,
        searchTags: JSON.stringify(searchQuery.searchTags),
        pageSize: settingsService.PAGE_SIZE
    };
    
    return httpHelper.get('/api/bookmarks', data)
        .then((jsonData) => {
            return {
                total: jsonData.total,
                dataItems: jsonData.dataItems
            }
        });
}

function saveBookmark(bookmark) {
    return httpHelper.post('/api/saveBookmark', {bookmark});
}

function deleteBookmark(id) {
    return httpHelper.delete('/api/bookmark/' + id);
}

function restoreBookmark(id) {
    return httpHelper.post('/api/restoreBookmark', {id});
}

function deleteMultipleBookmarks(ids) {
    return httpHelper.put('/api/deleteMultipleBookmarks', {ids});
}

function addTagsForMultipleBookmarks(ids, selectedTags) {
    let data = {
        ids,
        selectedTags
    };
    
    return httpHelper.put('/api/addTagsForMultipleBookmarks', data);
}

function getStatistic() {
    return httpHelper.get('/api/statistic');
}

function getTags() {
    return httpHelper.get('/api/tags');
}

function deleteTag(id) {
    return httpHelper.delete('/api/tag/' + id);
}

function saveTag(tag) {
    return httpHelper.post('/api/saveTag', {tag});
}

function exportBookmarks(filePath) {
    return httpHelper.post('/api/export/bookmarks', {filePath});
}

function importBrowserBookmarks(filePath) {
    return httpHelper.post('/api/import/browserBookmarks', {filePath});
}

function importBackupBookmarks(filePath) {
    return httpHelper.post('/api/import/backupBookmarks', {filePath});
}

function importBookmarks(bookmarksFile) {
    let data = new FormData();
    data.append('bookmarks', bookmarksFile);

    let url = '/api/import/browserBookmarks';
    let request = new Request(url, {
        method: 'POST',
        body: data
    });

    return fetch(request)
        .then((response) => {
            httpHelper.checkStatus(response);
            return response.json();
        })
        .then((result) => {
            if (!result.status === 'ok') {
                throw new Error(result.message);
            }

            return result.data;
        })
        .catch((err) => {
            httpHelper.handleError(err);
        });
}