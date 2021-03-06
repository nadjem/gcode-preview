const {app, BrowserWindow} = require('electron')
    const url = require("url");
    const path = require("path");
    // const environment = require('./src/environments/environment');
    const appEnv = require('./env.json');
    let mainWindow
    
    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false
        }
      })

       console.log(process.env.NODE_ENV)

       if(process.env.NODE_ENV === "production"){

        mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, `/dist/gcode-preview/index.html`),
              protocol: "file:",
              slashes: true
            })
          );

       }else{

        mainWindow.loadURL('http://localhost:4200');

       }
      
      // Open the DevTools.
      // mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })