const { ArgumentParser } = require('argparse');
const { exec } = require("child_process");
const { readFile, readFileSync, writeFileSync } = require('fs');

const parser = new ArgumentParser({
    description: 'c# template template'
});

parser.add_argument('-n', '--name', { help: 'sets project name' });
parser.add_argument('-d', '--dest', { help: 'sets project destination' });
let args = parser.parse_args();
function execCommand(cmd) {
    exec(cmd, (err, out) => {
        console.log(out);
        if (err) {
            console.log(err);
        }
    })
}

let projectName = `${args.name}App`
execCommand(`cp -r ./template ./${projectName}.Solution`)
execCommand(`mv ./${projectName}.Solution/nameApp ./${projectName}.Solution/${projectName}`)
execCommand(`mv ./${projectName}.Solution/${projectName}/nameApp.csproj ./${projectName}.Solution/${projectName}/${projectName}.csproj`)
execCommand(`mv ./${projectName}.Solution/nameApp.Tests ./${projectName}.Solution/${projectName}.Tests`)
execCommand(`mv ./${projectName}.Solution/${projectName}.Tests/nameApp.Tests.csproj ./${projectName}.Solution/${projectName}.Tests/${projectName}.Tests.csproj`)
setTimeout(()=> {
    const testProj = `./${projectName}.Solution/${projectName}.Tests/${projectName}.Tests.csproj`
    const testProjFile = readFileSync(testProj, "utf-8").replaceAll("$name", projectName);
    writeFileSync(testProj, testProjFile);
}, 500)
execCommand(`mv ./${projectName}.Solution/${projectName}.Tests/nameApp.Tests.cs ./${projectName}.Solution/${projectName}.Tests/${projectName}.Tests.cs`)
setTimeout(()=> {
    const testCode = `./${projectName}.Solution/${projectName}.Tests/${projectName}.Tests.cs`
    const testCodeFile = readFileSync(testCode, "utf-8").replaceAll("$name", projectName);
    writeFileSync(testCode, testCodeFile);
}, 500)
setTimeout(()=> {
    const mainCode = `./${projectName}.Solution/${projectName}/Program.cs`
    const mainCodeFile = readFileSync(mainCode, "utf-8").replaceAll("$name", projectName);
    writeFileSync(mainCode, mainCodeFile);
}, 500)
setTimeout(()=> {
    const projectPath = `./${projectName}.Solution`
    if (args.dest) {
        execCommand(`mv ${projectPath} ${args.dest}`)
    }
}, 500)