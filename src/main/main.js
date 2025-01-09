const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,

        },
    });
    // load react in development mode
    if (process.env.NODE_ENV === 'development') {
        await mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools(); // Open DevTools only in development mode
    } else {
        await mainWindow.loadFile(path.join(__dirname, '../../build/index.html'));

        // Handle page load failure
        mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
            console.error(`Page failed to load (${errorCode}): ${errorDescription}`);
        });
    }

    // Optional: Handle renderer process crash
    mainWindow.webContents.on('render-process-gone', (event, details) => {
        console.error(`Renderer process crashed: ${details.reason}`);
    });
}

app.whenReady().then(createWindow);

// Handle macOS window behavior
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});