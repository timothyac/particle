import * as path from "path";
import { app, BrowserWindow } from "electron";
import "./ipc"; // eslint-disable-line import/no-unassigned-import

function createWindow(): void {
  /* Options for the browserwindow being created, you can find them all here:
    http://electronjs.org/docs/api/browser-window#new-browserwindowoptions
  */
  const windowOptions = {
    title: app.getName(),
    width: 150,
    height: 160,
    // transparent: true,
    // frame: false,
    alwaysOnTop: true,
    titleBarStyle: "hidden" as "hidden",
    webPreferences: {
      preload: path.resolve(`${__dirname}/../dist/browser.js`), // Preload a script into the browser context
      nodeIntegration: true
    }
  };

  // Define the browserWindow
  let win = new BrowserWindow(windowOptions);
  // Load the HTML file in the directory
  win.loadFile(path.join(__dirname, "./public/index.html"));
  // Set the positioning
  win.setPosition(1803, 870);
}

// Capture the ready event and create the window
app.on("ready", createWindow);
