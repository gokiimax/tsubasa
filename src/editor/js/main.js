const showdown = require('showdown')

const textEditor = document.querySelector('.text-editor')
const preview = document.getElementById('preview');
const converter = new showdown.Converter()

var renderPreview = function(value) {
    const html = converter.makeHtml(value);
    preview.innerHTML = html;
}

textEditor.addEventListener("keyup", event => {
    const { value } = event.target;

    window.localStorage.setItem('markdown', value);

    renderPreview(value)
})

const storedMarkdown = window.localStorage.getItem('markdown')

if (storedMarkdown) {
    textEditor.value = storedMarkdown;
    renderPreview(storedMarkdown);
}