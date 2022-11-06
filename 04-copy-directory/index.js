//Подключаем модули
const fsPromis = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function copyDir() {
    const sourceDirPath = path.join(__dirname, 'files');
    const targetDirPath = path.join(__dirname, 'files-copy');
    fsPromis.mkdir(targetDirPath, { recursive: true });
    const sourceFileList = await fsPromis.readdir(sourceDirPath);
    const targetFileList = await fsPromis.readdir(targetDirPath);
    for (let file of targetFileList) {
        const targetFilePath = path.join(targetDirPath, file);
        fsPromis.unlink(targetFilePath);
    }
    for (let file of sourceFileList) {
        const sourceFilePath = path.join(sourceDirPath, file);
        const targetFilePath = path.join(targetDirPath, file);
        const input = await fs.createReadStream(sourceFilePath, 'utf-8');
        const output = await fs.createWriteStream(targetFilePath);
        input.pipe(output);
    }
}

copyDir();