//Подключение модулей
const { stat } = require('fs');
const fs = require('fs/promises');
const path = require('path');

async function getFiles() {
    const folderPath = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(folderPath, {withFileTypes: true});
    for (const file of files) {
        if(file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const fileStat = await fs.stat(filePath);
        const fileName = file.name.split('.')[0];
        const fileExt = file.name.split('.')[1];
        const fileSize = `${fileStat.size / 1000}kb`;
        console.log(fileName, ' - ', fileExt, ' - ', fileSize);
        }
    } 
}

getFiles();