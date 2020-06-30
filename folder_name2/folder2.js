function my_function (data, result) {
    return new Promise(function(resolve, reject) { 
        setTimeout(resolve, 2000); 
        console.log("Executing folder2.js..."); 
    }).then(function() { 
        return result;
    }); 
}

module.exports = my_function;