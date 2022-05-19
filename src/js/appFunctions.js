const { ipcRenderer } = require('electron')
const maxResIcon = document.getElementById('maxResIcon')
const maxResBtn = document.getElementById('maxResBtn')
const Sidebar = document.getElementById('Sidebar')
const ipc = ipcRenderer;
var isLeftMenuActive = true;

/* Minimize Application*/
minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

/* Maximize/Restore Application*/
function changeMaxesBtn(isMaximizedApp){
    if(isMaximizedApp) {
        maxResBtn.title = 'Restore'
        maxResIcon.classList.remove('fa-window-maximize')
        maxResIcon.classList.add('fa-window-restore')
    } else {
        maxResBtn.title = 'Maximize'
        maxResIcon.classList.add('fa-window-maximize')
        maxResIcon.classList.remove('fa-window-restore')
    }
}
maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})
ipc.on('isMaximized', () => { changeMaxesBtn(true)} );
ipc.on('isRestored', () => { changeMaxesBtn(false)} );

/* Close Application*/
closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})

/* TOGGLE MENU */
showHideMenus.addEventListener('click', () => {
    if(isLeftMenuActive) {
        Sidebar.style.width = '200px';
        isLeftMenuActive = false;
    } else {
        Sidebar.style.width = '0px';
        isLeftMenuActive = true;
    }
})

// Add submenu for sidebar
let arrow = document.querySelectorAll('.arrow');
for(var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener('click', (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu')
    })
}