import { ipcRenderer as ipc } from "electron";
import elementReady = require("element-ready");

// send a click event to the main process
function sendIpcToMain(element: HTMLElement): void {
  ipc.send("click");
  element.classList.add("active");
}

function removeActiveClass(element: HTMLElement): void {
  element.classList.remove("active");
}

// Use an IFFE to run the script on load
(async function testes() {
  console.log("Preloaded browser script");

  // Wait until element is shown in the DOM
  const button = (await elementReady<HTMLElement>("#button", {
    stopOnDomReady: false
  }))!;

  const nucleus = (await elementReady<HTMLElement>("#nucleus", {
    stopOnDomReady: false
  }))!;

  // Listen for click
  button.addEventListener("click", () => {
    sendIpcToMain(nucleus);
  });

  ipc.on("remove-active", () => {
    removeActiveClass(nucleus);
  });
})();
