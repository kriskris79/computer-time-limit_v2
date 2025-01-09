const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
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
        await mainWindow.loadURL('http://localhost:3000');
    } else {

        await mainWindow.loadFile(path.join(__dirname, '../../build/index.html'));
}

    }

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit(); {
        app.quit()
    }
});