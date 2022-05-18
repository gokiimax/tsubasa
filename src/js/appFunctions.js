const { ipcRenderer } = require('electron')
const maxResIcon = document.getElementById('maxResIcon')
const maxResBtn = document.getElementById('maxResBtn')
const ipc = ipcRenderer;

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