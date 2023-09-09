const { app, BrowserWindow, screen, ipcMain  }= require('electron');
const path = require('node:path')

let win 

const appStart = () => {
  let data = {
    displays: screen.getAllDisplays()
  }

     win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: false,
      nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html', {query: {"data": JSON.stringify(data)}})

 
  }




  app.whenReady().then(() => {
   
    appStart()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) appStart()
      })
     
  })


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })