// const exts = ['.component.ts','.component.html'];

// function replaceHtml (html: string) {
//     function replacer (match: any,p1: string,p2: any,p3: any,offset: any,string: any) {
//         return `('需要替换到对应的模块'.${p1.toLowerCase()} | translate)`;
//     }
//     const r = html.replace(/dataService.(\w+)/g,replacer);
//     return r;
// }


// function traverDir (targetPath: string) {
//     const r = fs.statSync(targetPath);
//     if (r.isDirectory()) {
//         const dirResult = fs.readdirSync(targetPath);
//         // console.log(dirResult);
//         dirResult.forEach(filePath => {
//             // const stat = fs.statSync(path.join(targetPath,filePath));
//             console.log(path.join(targetPath,filePath));
//             traverDir(targetPath);
//         });
//     } else if (r.isFile()) {
//         fileCache.push(targetPath);
//     }
// }