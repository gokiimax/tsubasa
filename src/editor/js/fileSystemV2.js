// Electron FileSystem
// Made by @gokimax

/* Variables */
var remote = require('@electron/remote')
var { dialog } = remote;
var fs = require('fs');
var content = document.getElementById('text-editor').value;
var openFile;
var saved = true;
/* Html Components */
var text_editor = document.getElementById('text-editor')
var title_fileName = document.getElementById('filename')
var saved_dot = document.getElementById('save-dot')
var openBtn = document.getElementById('openBtn')
var saveBtn = document.getElementById('saveBtn')
var newBtn = document.getElementById('newBtn')

// Add keydown event for saving and opening
document.addEventListener('keydown', (event) => {
    var name = event.key;

    /* Saving*/
    if(event.ctrlKey && name === 's') {
        saveFiles()
    }
    /* Opening */
    else if(event.ctrlKey && name === 'o') {
        openFiles()
    } 
    /* Saving file as */
    else if(event.ctrlKey && name === 'S') {
        saveFileAs()
    }
})

// Add New File Button
newBtn.addEventListener('click', () => {
    createNew()
})

// Add Open Button Event
openBtn.addEventListener('click', () => {
    openFiles()
})

// Add Save Button Event
saveBtn.addEventListener('click', () => {
    saveFileAs()
})

// Add keydown event for save-dot 
text_editor.addEventListener('keydown', (event) => {
    if(event.ctrlKey) {
        return;
    }

    if(saved) {
        saved = !saved;
        saved_dot.style.opacity = 0
    } else {
        saved_dot.style.opacity = 1
    }
})

// Function for open files 
function openFiles() {
    var options = {
        title: 'Tsubasa | Open...',
        properties: [
            'openFile',
            'multiSelections'
        ]
    }

    files = dialog.showOpenDialog({options}).then(result => {
        files = result.filePaths;

        // Save the file
        openFile = files[0];
        window.localStorage.setItem('openFile', openFile);
        
        /* Update File in tab */
        onlyFilename = openFile.replace(/^.*[\\\/]/, '')
        title_fileName.innerHTML = onlyFilename

        /* Checking if a file is valid */
        if(files !== undefined) {
            // Read Content of the File
            fs.readFile(files[0], "utf-8", (err, data) => {
                if(err) {
                    return console.log(err);
                }
                content = data

                text_editor.value = content;
                renderPreview(content)
            })
        }
    })
}

// Function for saving files
function saveFiles() {
    var options = {
        title: 'Tsubasa | Save...',
    }

    if(openFile !== undefined) {
        console.log(openFile)
        writeFiles(openFile, document.getElementById('text-editor').value)
        saved_dot.style.opacity = 0
    } else {
        filename = dialog.showSaveDialog({options}).then(result => {
            filename = result.filePath;
    
            /* Checking if user sets a Filename*/
            if(filename === undefined || filename === '') {
                return console.log('[ERROR] User clicked Save-Button but filename is undefined!')
            }
            // Change openFile content
            openFile = result.filePath;
            window.localStorage.setItem('openFile', openFile);

            /* Update File in tab */
            onlyFilename = openFile.replace(/^.*[\\\/]/, '')
            title_fileName.innerHTML = onlyFilename

            // Write Content to the file
            writeFiles(filename, content)
            saved_dot.style.opacity = 0
        }).catch((err) => {
            console.error(err)
            openFile = undefined
        })
    }
}


/* Write File Function */
async function writeFiles(filePath, content) {
    try {
        await fs.writeFileSync(filePath, content)
    } catch (error) {
        console.error(`Got an error while trying to write to a file: ${error.message}`);
    }
}

// Function for saving file as 
function saveFileAs() {
    filename = dialog.showSaveDialog().then(result => {
        filename = result.filePath;

        /* Checking if user sets a Filename*/
        if(filename === undefined) {
            return console.log('[ERROR] User clicked Save-Button but filename is undefined!')
        }
        // Change openFile content
        openFile = result.filePath;

        /* Update File in tab */
        onlyFilename = openFile.replace(/^.*[\\\/]/, '')
        title_fileName.innerHTML = onlyFilename

        // Write Content to the file
        writeFiles(filename, content)
        saved_dot.style.opacity = 0
    }).catch((err) => {
        console.error(err)
        openFile = undefined
    })
}

const storedFile = window.localStorage.getItem('openFile')

if(storedFile) {
    openFile = storedFile;

    onlyFilename = openFile.replace(/^.*[\\\/]/, '')
    title_fileName.innerHTML = onlyFilename
}

function createNew() {
    openFile = undefined
    window.localStorage.clear()

    text_editor.value = ''
    content = text_editor.value;
    renderPreview(content)

    /* Update File in tab */
    title_fileName.innerHTML = 'Untitled-1'
}