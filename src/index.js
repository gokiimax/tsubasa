const { app, BrowserWindow, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');
const path = require('path');
const ipc = ipcMain

remoteMain.initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 680,
    minWidth: 1140,
    minHeight: 560,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    }
  });

  // and load the index.html of the app.
  remoteMain.enable(mainWindow.webContents)
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

    /* Close app*/
    ipc.on('closeApp', () => {
      console.log("Clicked on Close Button")
      mainWindow.close()
    })
  
    /* Minimize app*/
    ipc.on('minimizeApp', () => {
      console.log("Clicked on Minimize Button")
      mainWindow.minimize()
    })
  
    /* Maximize/Restore app */
    ipc.on('maximizeRestoreApp', () => {
      if(mainWindow.isMaximized()) {
        console.log("Clicked on Restore Button")
        mainWindow.restore()
      } else {
        console.log("Clicked on Maximize Button")
        mainWindow.maximize()
      }
    })
  
    // Check if is Maximized
    mainWindow.on('maximize', () => {
      mainWindow.webContents.send('isMaximized')
    })
    // Check if is Restored
    mainWindow.on('unmaximize', () => {
      mainWindow.webContents.send('isRestored')
    })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
