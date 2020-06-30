const fs = require('fs');
const { join } = require("path");
const cwd = process.cwd();

let data = {
    test_data: 'test data value'
};

let result = {
    test_result: 'test result value'
};

(async() =>{
    const run = async (cwd) => {
        async function get_dirs(path) {   // get all directories
            console.log('path: ', path);
            let dirs = []
            let dir_exeptions = ['.git'];
            
            for (const file of await fs.readdirSync(path)) {
                if(!dir_exeptions.includes(file)) {
                    if ((fs.statSync(join(path, file))).isDirectory()) {
                        dirs = [...dirs, file]
                    }
                }
            }
            console.log('dirs', cwd);
            return dirs;
        }
        const dirs = await get_dirs(cwd);
    
        async function execute(folders) {
            for(const folder of folders) {
                console.log(`checking folder ${folder}`);
                let files = fs.readdirSync(folder);
                for(const file of files) {
                    console.log(`found file ${file}`);
                    const my_function = require(join(cwd, folder, file));
                    console.log(`result: `, await my_function(data, result), '\n');
                }
            }
        }
        await execute(dirs);
    }
    
    await run(cwd);
    
    function my_function (data, result) {
        console.log('Executing main.js my_function...');
        return result;
    }
    my_function();
})();


