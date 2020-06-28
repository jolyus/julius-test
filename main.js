const { readdir, stat } = require("fs").promises
const { join } = require("path");

let data = {
    test_data: 'test data value'
};

let result = {
    test_result: 'test result value'
};

const run = async () => {
    const get_dirs = async path => {   // get all directories
        console.log('path: ', path);
        let dirs = []
        for (const file of await readdir(path)) {
            if ((await stat(join(path, file))).isDirectory()) {
                dirs = [...dirs, file]
            }
        }
        console.log('dirs', dirs);
        return Promise.resolve(dirs);
    }
    const dirs = await get_dirs('./');

    const execute = async folders => {
        const fs = require('fs');
        
        folders.forEach( async folder => {
            console.log(`checking folder ${folder}....\n`);
            let files = fs.readdirSync(folder);
            files.forEach( async file => {
                console.log(`found file ${file}...\n`);
                const my_function = require(`./${folder}/${file}`);
                console.log(`${file} result: `, my_function(data, result), '\n');
            })
        });
    }
    execute(dirs);
}

run().then(() => {
    const my_function = (data, result) => {
        console.log('execute main.js my_function');
        return result;
    }
    my_function();
});