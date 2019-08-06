import {
  ipcMain,
  Event as ElectronEvent,
  BrowserWindow,
  webContents
} from "electron";

let active: boolean = false;

ipcMain.on("click", (_event: ElectronEvent) => {
  console.log("Recieved click event from render process");
  // grab the current window
  const [win] = BrowserWindow.getAllWindows();

  if (!active) {
    win.setContentSize(800, 110);
    win.setPosition(1109, 870);
    active = !active;
    console.log(win.getPosition());
  } else {
    win.setSize(150, 160);
    win.setPosition(1803, 870);
    win.webContents.send("remove-active");
    active = !active;
    console.log(win.getPosition());
  }
});
