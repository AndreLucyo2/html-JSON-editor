        // Syntax highlighting for JSON keys, strings, and numbers using JavaScript
        function highlightJSON(json) {
            const highlightedJSON = json.replace(/(".*?":)/g, '<span class="json-key">$1</span>')
                .replace(/(".*?")/g, '<span class="json-string">$1</span>')
                .replace(/(\b\d+\b)/g, '<span class="json-number">$1</span>');

            return highlightedJSON;
        }

        function pasteJSON() {
            const jsonInput = document.getElementById('jsonInput');
            const jsonBlock = document.getElementById('jsonBlock');
            const json = jsonInput.value;

            jsonBlock.innerHTML = '<pre>' + highlightJSON(json) + '</pre>';
        }