// Syntax highlighting for JSON keys, strings, numbers, dates, {}, and : using JavaScript
function highlightJSON(json) {
    const formattedJSON = json
        .replace(/"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{3}Z?|[+\-]\d{2}:\d{2})?)"/g, '<span class="json-string">"$1"</span>') // Date format
        .replace(/"(\{|\}|\:)/g, '<span class="json-key">"$1"</span>'); // {}, :

    return formattedJSON;
}

function sortObjectKeys(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }

    const sortedObj = {};
    const keys = Object.keys(obj).sort();

    for (const key of keys) {
        sortedObj[key] = sortObjectKeys(obj[key]);
    }

    return sortedObj;
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
    const sortKeysCheckbox = document.getElementById('sortKeys');
    const json = jsonInput.value;

    try {
        let parsedJSON = JSON.parse(json);

        if (sortKeysCheckbox.checked) {
            parsedJSON = sortObjectKeys(parsedJSON);
        }

        const formattedJSON = formatJSON(parsedJSON);
        jsonBlock.innerHTML = '<pre>' + formattedJSON + '</pre>';
    } catch (error) {
        jsonBlock.innerHTML = '<pre>Erro: JSON inválido</pre>';
    }
}