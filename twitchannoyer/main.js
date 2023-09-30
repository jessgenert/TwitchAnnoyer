const { app, BrowserWindow, screen, ipcMain, dialog } = require('electron');
const path = require('node:path')
const { localStorage } = require("electron-browser-storage");
let win

const appStart = () => {
  let data = {
    displays: screen.getAllDisplays()
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './icon.png',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html', { query: { "data": JSON.stringify(data) } })



}
ipcMain.on('main:add', (event, currentDisplay) => {
  let newWindow = new BrowserWindow({
    width: currentDisplay.bounds.width,
    height: currentDisplay.bounds.height,
    maxWidth: currentDisplay.bounds.width,
    maxHeight: currentDisplay.bounds.height,
    icon: './icon.png',
    x: 0,
    y: 0,

    frame: false,
    webPreferences: {
      // devTools:false,
      contextIsolation: false,
      nodeIntegration: true
    },
    transparent: true,
    // focusable:true,
    resizable: false,
    movable: false,
    fullscreen: true,
    hasShadow: false,
    minimizable: false,
    alwaysOnTop: true
  })


  newWindow.loadFile('mainPage.html')
  newWindow.show()
  newWindow.setIgnoreMouseEvents(true)
})
ipcMain.on('redirect:add', () => {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './icon.png',
    webPreferences: {
      nodeIntegration: false
    }
  })

  var authUrl = 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=g9s9rhz2the6avwr3bdob15oq77m32&redirect_uri=http://localhost:3000&scope=chat%3Aread+chat%3Aedit'

  authWindow.loadURL(authUrl);
  authWindow.webContents.on('will-navigate', function (event, newUrl) {
    localStorage.setItem('access_token', newUrl.slice(newUrl.indexOf("=") + 1, newUrl.indexOf("&")))
    if (newUrl.startsWith('http://localhost')) {
      setTimeout(() => {

        authWindow.close('index.html')

      }, 200)
    }
  })

})



app.whenReady().then(() => {

  appStart()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) appStart()
  })
  ipcMain.handle("showDialog", (e, message) => {
    dialog.showOpenDialog(win, { message });
  });


})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})