//Подключаем модули
const fs = require('fs');
const path = require('path');
const {stdout} = process;

//Добавляем путь к файлу и поток чтения
const readPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(readPath, 'utf-8');

//Выводим данные из файла в консоль
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));