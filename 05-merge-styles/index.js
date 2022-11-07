//Подключаем модули
const fsPromis = require('fs/promises');
const fs = require('fs');
const path = require('path');

//Читаем содержимое папки styles
async function mergeStyles() {
    const sourceFolderPath = path.join(__dirname, 'styles');
    const files = await fsPromis.readdir(sourceFolderPath, {withFileTypes: true});
    let styleContents = [];
//Находим файлы с расширением .css и добавляем их в массив
    for (const file of files) {
        if(file.isFile() && file.name.includes('.css')) {
        const filePath = path.join(sourceFolderPath, file.name);
        const content = await fsPromis.readFile(filePath, 'utf8');
        styleContents.push(content);
        }
    } 
    const targetFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
    if(fs.existsSync(targetFilePath)) {
        fsPromis.unlink(targetFilePath);
    }
    for(let content of styleContents) {
        fsPromis.appendFile(targetFilePath, content, 'utf8');
    }
}

mergeStyles();