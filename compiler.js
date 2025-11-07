import { lexer } from "./lexer.js";
import { parser } from "./parser.js";
import {codeGen} from "./codeGen.js"
export function compiler(input) {
    const tokens = lexer(input);
    const ast = parser(tokens)
    const execCode = codeGen(ast)

    return execCode
}