// Syntax highlighting for JSON keys, strings, and numbers using JavaScript
function highlightJSON(json) {
    const highlightedJSON = json.replace(/(".*?":)/g, '<span class="json-key">$1</span>')
        .replace(/(".*?")/g, '<span class="json-string">$1</span>')
        .replace(/(\b\d+\b)/g, '<span class="json-number">$1</span>');

    return highlightedJSON;
}

function formatJSON(obj, indentLevel = 0) {
    const indentSpaces = '  '.repeat(indentLevel);
    let formattedJSON = '';

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            formattedJSON += `${indentSpaces}<span class="json-key">"${key}"</span>: {\n${formatJSON(obj[key], indentLevel + 1)}${indentSpaces}}\n`;
        } else {
            formattedJSON += `${indentSpaces}<span class="json-key">"${key}"</span>: ${highlightJSON(JSON.stringify(obj[key]))},\n`;
        }
    }

    return formattedJSON;
}

function pasteJSON() {
    const jsonInput = document.getElementById('jsonInput');
    const jsonBlock = document.getElementById('jsonBlock');
    const json = jsonInput.value;

    try {
        const parsedJSON = JSON.parse(json);
        const formattedJSON = formatJSON(parsedJSON);
        jsonBlock.innerHTML = '<pre>' + formattedJSON + '</pre>';
    } catch (error) {
        jsonBlock.innerHTML = '<pre>Erro: JSON inválido</pre>';
    }
}