const electron = require('electron');
const { ipcRenderer, remote } = electron;

// 获取DOM
const cancelDom = document.querySelector('.cancel'),
      confirmDom = document.querySelector('.confirm');

// 绑定事件监听
cancelDom.addEventListener('click', () => {
    remote.getCurrentWindow().close();
})

confirmDom.addEventListener('click', () => {
    ipcRenderer.send('addWindow:confirm', document.querySelector('input').value)
    remote.getCurrentWindow().close();
})