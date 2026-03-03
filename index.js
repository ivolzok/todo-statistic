const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            executeShow()
            break;
        case 'important':
            getImportntToDos();
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function executeShow(){
    let comments = getAllTODOes()
    console.log(comments);
}

function getAllTODOes() {
    let comments = []
    let files = getFiles()
    for (const file of files) {
        comments = comments.concat(get_TODOes(file));
    }
    return comments;
}
function getImportntToDos(){
    for (let toDo of getAllTODOes()) {
        if (toDo.includes('!')) {
            console.log(toDo);
        }
    }
}

function get_TODOes(text){
    let res = []
    let strings = text.split('\n');
    for (let str of strings) {
        let splited = str.split('//');
        if (splited.length <= 1)
            continue;
        let comment = splited[1].trim();
        if (comment.startsWith('TODO')){
            res.push(comment);
        }
    }
    return res;
}

// TODO you can do it!
