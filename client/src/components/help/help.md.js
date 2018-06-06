export default
`
# Bookmarks Archive

## Introduction

Bookmarks Archive (*BA*) is a desktop program to store your Web Bookmarks. Over time number of bookmarks saved in your browser will grow and it is not very convenient to manage bookmarks collection in the browser itself.

*BA* provides an easy and convenient way to work with your bookmarks collection no matter how big it is.

## Functionality

You can import bookmarks from any major browser. First export bookmarks as HTML file. Then use that HTML file to import bookmarks into *BA*. You can import bookmarks in that way a few times, each bookmark will be imported just once.

If a bookmark is located is some sub-folder this information will be saved for that bookmark in *original path*.

You can edit bookmarks, create tags, assign tags to bookmarks. Tags will allow you to search for bookmarks later on.

There are different filtering modes. You can search for new ones (with no tags), bookmarks with particular tags (at least one of selected) or deleted bookmarks.

For each filter mode, you can search by text. It will search in bookmark *title*, *url* and *original path*.

## Settings

There are a few settings which you can change. Currently it should be done manually by editing file '/data/config/settings.json'. 

You can change port on which program will run. That makes sense only if that port is occupied by something else.

Bookmarks data is stored as JSON file in '/data/db.json' (by default), you can change that location to something else. Make sure you have valid JSON in settings file, for path you have to escape '/' in Windows, for example 'C://Docs//bookmarks.json'.

## Tips

There are some keyboard shortcuts:

* Ctrl+Enter: to save bookmark and close popup modal
* Esc: close modal or close tag list selection

It may be convenient to use tags names like folder structure:

* Programming/JavaScript
* Programming/JavaScript/ES6
* Programming/CSS
`