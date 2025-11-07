#!/usr/bin/env node

import path from "path";
import fs from "fs";


import {compiler} from "./compiler.js"
 const directoryPath = './'; // Replace with your directory
const targetExtension = '.jaat'; // Replace with your desired extension
fs.readdir(directoryPath, (err, files) => {
   const txtFiles = files.filter(file => {
        return path.extname(file) === targetExtension;
    });
   function runner(input) {
    eval(input)
}

const code = fs.readFileSync(`./${txtFiles}`, 'utf-8')
compiler(code)
const exec = compiler(code)
runner(exec)

});
    

