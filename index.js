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
    switch (command.split(' ')[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            executeShow()
            break;
        case 'important':
            getImportantToDoes();
            break;
        case 'sort':
            const arg = command.split(' ')[1];
            let comments = getAllTODOes()
            if (arg === 'importance'){
                executeSortImportance(comments)
            }
            else if (arg === 'user'){
                executeSortUser(comments)
            }
            else if (arg === 'date'){
                executeSortDate(comments)
            }
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

function executeSortImportance(comments){
    comments.sort((a,b) => -(a.split('!').length - b.split('!').length))
    console.log(comments);
}

function executeSortUser(comments){
    comments.sort(function (a, b){
        const aSplited = a.split(';')
        if (aSplited.length <= 1){
            return 1;
        }
        const bSplited = b.split(';')
        const aName = aSplited[0].split(' ').slice(1).join(' ').trim();
        const bName = bSplited[0].split(' ').slice(1).join(' ').trim();
        if (aName === 'Anonymous Developer')
            return 1;
        return bName.localeCompare(aName);
    })
    console.log(comments);
}

function executeSortDate(comments){
    comments.sort(function (a, b){
        const aSplited = a.split(';')
        if (aSplited.length <= 1){
            return 1;
        }
        const bSplited = b.split(';')
        const aDate = new Date(aSplited[1].trim())
        const bDate = new Date(bSplited[1].trim())
        return bDate.getTime() - aDate.getTime();
    })
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
function getImportantToDoes(){
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
