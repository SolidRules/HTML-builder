//Импорт всех требуемых модулей
const fsPromis = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function buildPage(){
//Прочтение и сохранение в переменной файла-шаблона
let template = await fsPromis.readFile(path.join(__dirname, 'template.html'), 'utf8');

//Записываем содержимое компонентов в соответсвующие места шаблона HTML
const componentsFolder = path.join(__dirname, 'components');
const htmlList = await fsPromis.readdir(componentsFolder, {withFileTypes: true});
//Находим файлы с расширением .html и добавляем их в массив
for (const item of htmlList) {
    if(item.isFile() && item.name.includes('.html')) {
    const filePath = path.join(componentsFolder, item.name);
    const fileName = item.name.split('.')[0];
    const component = await fsPromis.readFile(filePath, 'utf8');
    const regexp = new RegExp(`{{${fileName}}}`, 'gm');
    template = template.replace(regexp, component);
    }
} 

//Запись изменённого шаблона в файл index.html в папке project-dist
fsPromis.mkdir(path.join(__dirname, 'project-dist'), { recursive: true});
fsPromis.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, 'utf8');

//Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css
//Читаем содержимое папки styles
    const sourceStylesPath = path.join(__dirname, 'styles');
    const styleList = await fsPromis.readdir(sourceStylesPath, {withFileTypes: true});
    const styles = [];
//Находим файлы с расширением .css и добавляем их в массив
    for (const item of styleList) {
        if(item.isFile() && item.name.includes('.css')) {
        const itemPath = path.join(sourceStylesPath, item.name);
        const content = await fsPromis.readFile(itemPath, 'utf8');
        styles.push(content);
        }
    } 
    const targetStylesPath = path.join(__dirname, 'project-dist', 'style.css');
    if(fs.existsSync(targetStylesPath)) {
        fsPromis.unlink(targetStylesPath);
    }
    for(let style of styles) {
        fsPromis.appendFile(targetStylesPath, style, 'utf8');
    }

//Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist
    const sourceDirPath = path.join(__dirname, 'assets');
    const targetDirPath = path.join(__dirname, 'project-dist', 'assets');
    fsPromis.mkdir(targetDirPath, { recursive: true});
    const sourceFileDir = await fsPromis.readdir(sourceDirPath);
    //const targetFileDir = await fsPromis.readdir(targetDirPath);
    for (let dir of sourceFileDir) {
        fsPromis.mkdir(path.join(targetDirPath, dir), { recursive: true});
        console.log(dir)
        const sourceFilesList = await fsPromis.readdir(path.join(sourceDirPath, dir));
        const targetFilesList = await fsPromis.readdir(path.join(targetDirPath, dir));
    for (let file of targetFilesList) {
        const targetFilePath = path.join(targetDirPath, dir, file);
        fsPromis.unlink(targetFilePath);
    }
    for (let file of sourceFilesList) {
            console.log(file)
        const sourceFilePath = path.join(sourceDirPath, dir, file);
        const targetFilePath = path.join(targetDirPath, dir, file);
        const input = await fs.createReadStream(sourceFilePath, 'utf-8');
        const output = await fs.createWriteStream(targetFilePath);
        input.pipe(output);
        }
    }
}

/* for (let file of targetFileList) {
    const targetFilePath = path.join(targetDirPath, file);
    fsPromis.unlink(targetFilePath);
}
 */
buildPage();