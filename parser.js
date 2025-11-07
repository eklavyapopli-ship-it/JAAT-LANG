export function parser(tokens) {
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
            if (tokens[0].type === 'string') {
                let strToken = tokens.shift();
                ast.body.push({
                    type: 'Print string',
                    expression: strToken.value,
                });
                continue;
            }
           
        }




    }
    return ast;


}
