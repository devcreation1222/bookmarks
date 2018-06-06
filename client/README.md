## Bookmarks Archive

Simple bookmarks management utility

### How to run app

Download and unzip latest release.

You can run manually from app folder

``` bash
node app.js
```

Or find auto run script in /start/win/start.vbs. You can create shortcut for that file and change its icon.

Programm will launch new Chrome instance in app mode, if you do not have Chrome it will launch default browser.

Alternatively app is available by default url: http://localhost:4088

### Run development environmnent

To run client

```bash
npm i -g react-scripts
cd client
npm i
npm start
```

To run server

run with NODE_ENV=development