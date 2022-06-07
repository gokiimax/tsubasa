// Add About Button
let aboutBtn = document.getElementById('aboutBtn')
aboutBtn.addEventListener('click', () => {
    require('electron').shell.openExternal('https://github.com/gokiimax/tsubasa')
})

// Edit Button
let copyBtn = document.getElementById('copyBtn')
copyBtn.addEventListener('click', () => {
    navigator-clipboard.writeText(textEdtr.value)
})