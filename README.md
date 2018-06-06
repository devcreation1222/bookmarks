## Bookmarks Archive

Simple bookmarks management utility

<img src="https://cloud.githubusercontent.com/assets/3333358/20918476/d2884e84-bbc9-11e6-9219-77e921df61ba.PNG"/>

Demo site do not have persistence and all changes will disappear after full page reload.

### How to run app

Download and unzip latest release.

You can run manually from app folder

``` bash
node app.js
```

Or find autorun script in /start/win/start.vbs. You can create a shortcut for that file and change its icon.

Programme will launch new Chrome instance in app mode, if you do not have Chrome it will launch default browser.

Alternatively, app is available by default URL: http://localhost:4088

### Run development environmnent

To run client

```bash
npm i -g react-scripts
cd client
npm i
npm start
```

To run server

compile typescript
run /server/build/src/startServer.js with NODE_ENV=development