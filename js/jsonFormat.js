/* Faz o processamento do JSON colado */
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

        const hiddenSection = document.querySelector('.hidden');
        hiddenSection.style.display = 'none';

        alert('JSON processado com sucesso!');
    } catch (error) {
        jsonBlock.innerHTML = '<pre>Erro: JSON inválido</pre>';
    }
}

/* Executa ordenamento pela chave do json ordem alfabetica */
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
    let formattedJSON = '{\n';

    for (const key in obj) {
        formattedJSON += `${indentSpaces}<span class="json-key">"${key}"</span>: `;

        if (typeof obj[key] === 'object') {
            formattedJSON += formatJSON(obj[key], indentLevel + 1);
        } else {
            formattedJSON += highlightJSON(JSON.stringify(obj[key]));
        }

        formattedJSON += ',\n';
    }

    formattedJSON += `${'  '.repeat(indentLevel)}}`;

    return formattedJSON;
}

// Syntax highlighting for JSON keys, braces, colon, boolean, strings, and numbers using JavaScript
function highlightJSON(json) {
    const formattedJSON = json
        .replace(/"(\{|\})"/g, '<span class="json-braces">"$1"</span>') // {} - Chaves de abertura e fechamento
        .replace(/":/g, '<span class="json-colon">":</span>') // : - Dois pontos
        .replace(/:\s*(true|false)/g, '<span class="json-boolean">$1</span>') // Booleanos
        .replace(/:\s*null/g, '<span class="json-null">$&</span>') // Nulos
        .replace(/"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{3}Z?|[+\-]\d{2}:\d{2})?)"/g, '<span class="json-string">"$1"</span>') // Strings (data)
        .replace(/:\s*"([^"]*?)"/g, ': <span class="json-string">"$1"</span>') // Strings (delimitado por aspas)
        .replace(/:\s*(-?\d+(\.\d+)?([eE][+-]?\d+)?)\b/g, ': <span class="json-number">$1</span>'); // Números

    return formattedJSON;
}

function clearJSONInput() {
    const jsonInput = document.getElementById('jsonInput');
    jsonInput.value = '';
    const jsonBlock = document.getElementById('jsonBlock');
    jsonBlock.innerHTML = '';

    const hiddenSection = document.querySelector('.hidden');
    hiddenSection.style.display = 'block';
}