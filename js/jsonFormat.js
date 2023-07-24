        // Syntax highlighting for keywords and strings using JavaScript
        const codeBlocks = document.querySelectorAll('.code-block');

        codeBlocks.forEach((block) => {
            const lines = block.querySelectorAll('p');
            lines.forEach((line) => {
                const text = line.innerHTML;
                line.innerHTML = text.replace(/(\bconst\b|\bfunction\b|\breturn\b|\bif\b|\belse\b)\b/g, '<span class="keyword">$1</span>');
                line.innerHTML = line.innerHTML.replace(/\/\/(.*)/g, '<span class="comment">//$1</span>');
                line.innerHTML = line.innerHTML.replace(/"(.*?)"/g, '<span class="string">"$1"</span>');
                line.innerHTML = line.innerHTML.replace(/(\d+)/g, '<span class="number">$1</span>');
            });
        });