 //handle setupevents as quickly as possible
 const setupEvents = require('./installers/windows/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const ipc = ipcMain
const userPath = path.join(app.getPath("userData"), "save.json");
function requestSave() {
	let data = []
	try {
		data = JSON.parse(fs.readFileSync(userPath))
	} catch(error) {
		data = []
	} finally {
		//console.log(data);
		fs.writeFileSync(userPath, JSON.stringify(data))
	}
	return data
}

function saveData(data) {
	//console.log(data);
	fs.writeFileSync(userPath, JSON.stringify(data.data))
	//console.log("Data Written");
}


app.on("ready", () => {
	ipc.on("requestSave", (event, message) => {
		//console.log("got an IPC message", message);
		const data = requestSave();
		event.reply("data", data);
	})
	ipc.on("saveData", (event, message) => {
		saveData(message);
	});
	//console.log(app.getPath("userData"));	
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: false,
			contextIsolation: true
		}
	});
	mainWindow.loadFile(path.join(__dirname, "public/index.html"));
	//mainWindow.webContents.openDevTools();
});
app.on("window-all-closed", () => {
	app.quit();
});
