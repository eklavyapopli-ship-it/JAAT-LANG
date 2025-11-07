import fs from "fs";

// Bhai yo se Lexer, thara code ye hi todega


function lexer(input) {
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

        // ✅ Handle string literals inside double quotes
        if (char1 === '"') {
            cursor++; // skip opening quote
            let str = '';
            while (cursor < line.length && line[cursor] !== '"') {
                str += line[cursor++];
            }
            
          
              
                tokens.push({ type: 'string', value: str });
            continue;
            

          
        }
        cursor++;

        // fallback for normal identifiers or words
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

// Ar yo se thara parser, ye thare code ka Absract Syntax Tree banauga 

function parser(tokens) {
    const ast = {
        type: 'Program',
        body: []

    }
    while (tokens.length > 0) {
        let token = tokens.shift();
        if (token.type === 'keyword' && token.value === "tha le") {
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            };
            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift();
                let expression = '';
                while (tokens.length > 0 && tokens[0].type !== 'keyword') {
                    expression += tokens.shift().value;

                }
                declaration.value = expression.trim();
            }
            ast.body.push(declaration);
        }
        if (token.type === 'keyword' && token.value === "suna de") {
            ast.body.push({
                type: 'Print',
                expression: tokens.shift().value
            });

        };
        if (token.type === 'keyword' && token.value === "likh de") {
            let seperator = " ";
            let arrOf = [];
            for (let i = 0; i < tokens.length; i++) {
                // arrOf.push(tokens[i].value)
                if(tokens[i].type === 'string'){
                    arrOf.push(tokens[i].value)
                }

            }
            let resString = arrOf.join(" ");
            ast.body.push({
                type: 'Print string',
                expression: resString,
            });
        }




    }
    return ast;


}

// Ar ye thare code jo javascript mei jotega jaise tham hooka jotte ho
function codeGen(node) {
    switch (node.type) {
        case 'Program': return node.body.map(codeGen).join('\n');
        case 'Declaration': return `const ${node.name}=${node.value}`;
        case 'Print': return `console.log(${node.expression})`;
        case 'Print string': return `console.log("${node.expression}")`;


    }


}
// ib auga compiler

function compiler(input) {
    const tokens = lexer(input);
    const ast = parser(tokens)
    const execCode = codeGen(ast)

    return execCode
}
// ar ye thare code ka starter h 
function runner(input) {
    eval(input)
}
// Aakhri kaam
const code = fs.readFileSync('./main.jaat', 'utf-8')
compiler(code)
const exec = compiler(code)
runner(exec)
