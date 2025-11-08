export function lexer(input) {
    const tokens = [];

    const lines = input.split('\n')
    for (let line of lines) {
        let cursor = 0;
        if (line.startsWith('tha le')) {
            tokens.push({ type: 'keyword', value: "tha le" });
            cursor += 6
        }
        else if (line.startsWith('suna de')) {
            tokens.push({ type: 'keyword', value: "suna de" });
            cursor += 7
        }
       else if (line.startsWith('likh de')) {
    tokens.push({ type: 'keyword', value: "likh de" });
    cursor += 7;

    while (cursor < line.length) {
        let char1 = line[cursor];

        // skip whitespace
        if (/\s/.test(char1)) {
            cursor++;
            continue;
        }

        
        if (char1 === '"') {
            cursor++; 
            let str = '';
            while (cursor < line.length && line[cursor] !== '"') {
                str += line[cursor++];
            }

              
                tokens.push({ type: 'string', value: str });
            continue;
            

          
        }
        cursor++;

       
        if (/[a-zA-Z]/.test(char1)) {
            let word1 = '';
            while (cursor < line.length && /[a-zA-Z0-9]/.test(char1)) {
                word1 += line[cursor++];
            }
            tokens.push({ type: 'identifier', value: word1 });
            continue;
        }

        cursor++;
    }
}
        while (cursor < line.length) {
            let char = line[cursor];
            if (/\s/.test(char)) {
                cursor++;
                continue;
            }
            if (/[a-zA-Z]/.test(char)) {
                let word = '';

                while (cursor < line.length && /[a-zA-Z0-9]/.test(char)) {
                    word += char;
                    char = line[++cursor];
                }
                tokens.push({ type: 'identifier', value: word });
                continue;

            }

            if (/[\+\-\*\/=]/.test(char)) {


                tokens.push({ type: 'operator', value: char });
                cursor++

                continue;
            }
            if (/[0-9]/.test(char)) {
                let num = '';
                while (/[0-9]/.test(char)) {
                    num += char;
                    char = line[++cursor];

                }
                tokens.push({ type: 'number', value: parseInt(num) });
                continue;
            }

        }
    }

    return tokens;

}