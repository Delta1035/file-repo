import fs from 'fs';
import path from 'path';
const exts = ['.component.ts','.component.html'];

const htmlFileCache: string[] = [];
const tsFileCache: string[] = [];
const moduleList: string[] = [
    'page-dock',
    'page-inventory',
    'page-orders',
    'create-replenishment'
];
async function traverseDir (targetPath: string) {
    const r = await fs.promises.stat(targetPath);
    if (r.isDirectory()) {
        const dirResult = await fs.promises.readdir(targetPath);
        for (const filePath of dirResult) {
            const fullPath = path.join(targetPath,filePath);
            await traverseDir(fullPath);
        }
    } else if (r.isFile()) {
        if (targetPath.endsWith(exts[1])) {
            htmlFileCache.push(targetPath);
        }
        if (targetPath.endsWith(exts[0])) {
            tsFileCache.push(targetPath);
        }
    }
}

function replaceHtml (html: string,module?: string) {
    function replacer (match: any,p1: string,p2: any,p3: any,offset: any,string: any) {
        return `('${module ?? '需要替换到对应的模块'}.${p1[0].toLowerCase() + p1.substring(1)}' | translate)`;
    }
    const r = html.replace(/dataService.(\w+)/g,replacer);
    console.log(r);

    return r;
}

async function handleHtmlReplace (pathList: string[]) {
    for (const filePath of pathList) {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            const html = await fs.promises.readFile(filePath,{ encoding: 'utf-8' });
            let module = "没有匹配的模块";
            if (filePath.includes('page-dock')) {
                module = 'dock';
            } else if (filePath.includes('page-inventory')) {
                if (filePath.includes('page-create-replenishment')) {
                    module = 'createReplenishment';
                } else {
                    module = 'inventory';
                }
            } else if (filePath.includes('page-orders')) {
                module = 'ordersReturn';
            }
            const replacedHtml = replaceHtml(html,module);
            await fs.promises.writeFile(filePath,replacedHtml,{ encoding: 'utf-8' });
        }
    }
}

const targetPath = '/home/sz123/桌面/zcy/projects/jmfront/jmall-front/src/jmall/page';
traverseDir(targetPath).then(() => {
    // console.log(fileCache);
    fs.writeFileSync('html-file-path.json',JSON.stringify(htmlFileCache),{ encoding: 'utf8' });
    fs.writeFileSync('ts-file-path.json',JSON.stringify(tsFileCache),{ encoding: 'utf8' });
    handleHtmlReplace(htmlFileCache);
}).catch(err => {
    console.error('Error occurred:',err);
});
