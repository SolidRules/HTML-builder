//Подключение модулей
const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

//Добавление потока записи
const writePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(writePath);

//Вывод приветсвенного сообщения в консоль
stdout.write('Введите текст, который вы хотите добавить в файл text.txt\n')

//Ожидание ввода текста в консоль и запись в файл
stdin.on('data', data => {
    const text = data.toString().trimEnd();
    if(text === 'exit') process.exit();
    output.write(`${text}\n`);
});

//Вывод прощального сообщения в консоль
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Работа закончена. До встречи!'));