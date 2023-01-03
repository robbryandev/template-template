const { ArgumentParser } = require('argparse');
const fs = require('fs-extra');

const glob = require("glob");
const path = require('path');
const { exit } = require('process');


const parser = new ArgumentParser({
    description: 'c# template template'
});

parser.add_argument('-n', '--name', { help: 'sets project name' });
parser.add_argument('-d', '--dest', { help: 'sets project destination' });
parser.add_argument('-l', '--lang', { help: 'sets which language your template is for' });
parser.add_argument('-t', '--temp', { help: 'sets which project template to use' });
let args = parser.parse_args();

const replaceAllNames = function (src, fileMode) {
    glob(src + '/**/*', (err, res) => {
        if (err) {
            console.log('Error', err);
        } else {
            for (let r in res) {
                if (!fs.existsSync(res[r])) {
                    continue;
                }
                if (fileMode) {
                    if (fs.lstatSync(res[r]).isFile()) {
                        const checkFile = fs.readFileSync(res[r], "utf-8").replaceAll("$name", `${args.name}`);
                        fs.removeSync(res[r]);
                        fs.writeFileSync(res[r].replaceAll("name",`${args.name}`), checkFile);
                    }
                } else if (fs.lstatSync(res[r]).isDirectory() && res[r].includes("name")) {
                    fs.renameSync(res[r], res[r].replaceAll("name", args.name));
                }
            }
        }
    });
};

if (!args.name || !args.dest || !args.lang || !args.temp) {
    console.log("Missing required parameters");
    exit(1);
}

if (!fs.lstatSync(`./templates/${args.lang}/${args.temp}`).isDirectory()) {
    console.log("invalid template");
    exit(2);
}

fs.copy(`./templates/${args.lang}/${args.temp}`, `${args.dest}/${args.name}App.Solution`);
setTimeout(() => {
    let replacePath = `${args.dest}/${args.name}`.replace("//", "/");
    if (args.lang === "csharp") {
        replacePath = replacePath + "App.Solution";
    }
    replaceAllNames(replacePath, false);
    setTimeout(() => {
        replaceAllNames(replacePath, true);
    }, 2000);
}, 500);