const electron = require('electron');
const { ipcRenderer } = electron;
const { dialog } = electron.remote;

const ulDom = document.querySelector('ul');
const shoppingCartWrapper = document.querySelector('.shopping-cart-wrapper');

// 检查是否还有商品
const checkHasLi = () => {
    let allLi = document.querySelectorAll('ul li');
    console.log(allLi)
    if(allLi.length == 0) {
        shoppingCartWrapper.style.display = 'flex'
    } else {
        shoppingCartWrapper.style.display = 'none'
    }
};

// 添加
ipcRenderer.on('add:item', (e, item) => {
    const li = document.createElement('li');
    li.innerText = item;

    ulDom.appendChild(li);
    checkHasLi();
})

// 删除所有
ipcRenderer.on('clear:all', (e, item) => {
    ulDom.innerHTML = null;
    checkHasLi();
})

// 删除一个
ulDom.addEventListener('click', (e) => {
    if(confirm('确定删除该商品吗？')) {
        ulDom.removeChild(e.target)
        checkHasLi();
    }
})