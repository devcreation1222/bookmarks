export default {
    searchList,
    sortList,
    getPage,
    deleteFromList,
    addToList
}

function searchList(list, searchStr, fields) {
    if (!searchStr) return list;

    return list.filter(bookmark => {
        for (let field of fields) {
            if (containsString(bookmark[field], searchStr)) return true;
        }

        return false;
    });
}

function sortList(list, sortBy, isAsc, fields) {
    for (let field of fields) {
        if (field.name === sortBy) {
            list.sort(getSortFunction(field.name, field.type, isAsc));
        }
    }

    return list;
}

function getSortFunction(field, type, isAsc) {
    let dirNum = isAsc ? 1: -1;

    switch (type) {
        case 'string':
            return (x, y) => x[field].localeCompare(y[field]) * dirNum;
        case 'number':
            return (x, y) => (x[field] - y[field]) * dirNum;
        case 'date':
            return (x, y) => (Date.parse(x[field]) - Date.parse(y[field])) * dirNum;
        default:
            return (x, y) => 0;
    }
}

function containsString(obj, searchStr) {
    return obj.toString().toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
}

function getPage(list, page, perPage) {
    var start = (page - 1) * perPage;
    var end = page * perPage;
    return list.slice(start, end);
}

function deleteFromList(list, predicate) {
    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
            list.splice(i, 1);
        }
    }
}

function addToList(list, entity, idField = 'id') {
    let maxId = 0;

    for (let i = 0; i < list.length; i++) {
        let id = list[i][idField];
        if (id > maxId) {
            maxId = id;
        }
    }

    entity[idField] = maxId + 1;

    list.push(entity);
}