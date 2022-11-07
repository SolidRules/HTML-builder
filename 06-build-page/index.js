//Импорт всех требуемых модулей
const fsPromis = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function buildPage(){
//Прочтение и сохранение в переменной файла-шаблона
let template = await fsPromis.readFile(path.join(__dirname, 'template.html'), 'utf8');

//Записываем содержимое компонентов в соответсвующие места шаблона HTML
const componentsFolder = path.join(__dirname, 'components');
const files = await fsPromis.readdir(componentsFolder, {withFileTypes: true});
//Находим файлы с расширением .html и добавляем их в массив
for (const file of files) {
    if(file.isFile() && file.name.includes('.html')) {
    const filePath = path.join(componentsFolder, file.name);
    const fileName = file.name.split('.')[0];
    const component = await fsPromis.readFile(filePath, 'utf8');
    const regexp = new RegExp(`{{${fileName}}}`, 'gm');
    template.replace(regexp, (match) => component);
    console.log(regexp, template);
    }
} 


//Запись изменённого шаблона в файл index.html в папке project-dist

//Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css

//Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist
}
buildPage();