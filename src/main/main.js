const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // load react in development mode
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
    } else {

    }
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
}

    //open DevTools for development
    if (process.env.NODE_ENV === 'development') {
     mainWindow.webContents.openDevTools();
    }

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});