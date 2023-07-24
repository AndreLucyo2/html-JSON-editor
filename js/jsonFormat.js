// Syntax highlighting for JSON keys, strings, and numbers using JavaScript
const jsonBlocks = document.querySelectorAll('.json-block');

jsonBlocks.forEach((block) => {
    const lines = block.querySelectorAll('span');
    lines.forEach((line) => {
        if (line.classList.contains('json-key')) {
            line.innerHTML = line.innerHTML.replace(/(".*?":)/g, '<span class="json-key">$1</span>');
        } else if (line.classList.contains('json-string')) {
            line.innerHTML = line.innerHTML.replace(/(".*?")/g, '<span class="json-string">$1</span>');
        } else if (line.classList.contains('json-number')) {
            line.innerHTML = line.innerHTML.replace(/(\b\d+\b)/g, '<span class="json-number">$1</span>');
        }
    });
});