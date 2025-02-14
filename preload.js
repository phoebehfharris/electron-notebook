const { ipcRenderer } = require('electron');

process.once('loaded', () => {
  window.addEventListener('message', event => {
    // do something with custom event
    const message = event.data;

    if (message.myTypeField === 'requestSave') {
      ipcRenderer.send('requestSave', message);
    } else if (message.myTypeField === 'saveData') {
      ipcRenderer.send('saveData', message);
    }
  });

});
ipcRenderer.on("data", (event, data) => {console.log("+++");console.dir(data);window.postMessage({myTypeField: "data", data: data});console.log("message")});

