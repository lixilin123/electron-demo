const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    createMainWindow();

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// listen
ipcMain.on('addWindow:confirm', (e, item) => {
    mainWindow.webContents.send('add:item', item)
})

// Create main window
const createMainWindow = () => {
    mainWindow = new BrowserWindow({ width: 1000, height: 800 });

    // mainWindow.loadFile('index.html');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './page/index/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        app.quit();
    })
}

// Create add window
const createAddWindow = () => {
    addWindow = new BrowserWindow({ width: 400, height: 220, frame: false});

    // mainWindow.loadFile('index.html');
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, './page/addWindow/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    addWindow.on('close', () => {
        addWindow = null;
    })
}

// Menu Template
const mainMenuTemplate = [
    {
        label: '操作',
        submenu: [
            {
                label: '添加',
                click() {
                    createAddWindow();
                }
            },
            {
                label: '清除所有',
                click() {
                    mainWindow.webContents.send('clear:all')
                }
            },
            {
                label: '退出程序',
                accelerator: process.platform == 'drawin' ? 'Comman+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu
if(process.platform == 'darwin') {
    mainMenuTemplate.unshift({})
}

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: '调试',
        submenu: [
            {
                label: '打开/关闭',
                accelerator: process.platform == 'drawin' ? 'Comman+I' : 'Ctrl+I',
                click(item, focuseWindow) {
                    focuseWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                label: '刷新页面'
            }
        ]
    })
}

