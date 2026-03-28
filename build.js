const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const styleCssPath = path.join(__dirname, 'style.css');
const scriptJsPath = path.join(__dirname, 'script.js');
const outputHtmlPath = path.join(__dirname, 'final_event_schedule.html');

// Read files
Promise.all([
    fs.promises.readFile(indexHtmlPath, 'utf8'),
    fs.promises.readFile(styleCssPath, 'utf8'),
    fs.promises.readFile(scriptJsPath, 'utf8')
])
.then(([htmlContent, cssContent, jsContent]) => {
    // Inject CSS
    let finalHtml = htmlContent.replace(
        '<style id="injected-styles"></style>',
        `<style id="injected-styles">${cssContent}</style>`
    );

    // Inject JavaScript
    finalHtml = finalHtml.replace(
        '<script id="injected-script"></script>',
        `<script id="injected-script">${jsContent}</script>`
    );

    // Write the final HTML file
    return fs.promises.writeFile(outputHtmlPath, finalHtml, 'utf8');
})
.then(() => {
    console.log(`Successfully compiled into ${outputHtmlPath}`);
})
.catch(err => {
    console.error('Error during compilation:', err);
});
