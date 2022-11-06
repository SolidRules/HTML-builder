const fs = require('fs');
const path = require('path');
const {stdout} = process;

const readPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(readPath, 'utf-8');

let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));