var fs = require('fs');
var path = require('path');
var os = require('os')
// var data = fs.readFileSync('fangular.json');
// console.log(data);
async function print(path) {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      console.log(dirent.name);
      console.log(dirent);
    //   path.basename()
    console.log(os.cpus());
    }


  }
  print('./').catch(console.error);