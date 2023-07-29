import fs from 'fs';
import parser from '@babel/parser';
import traverse from '@babel/traverse';
function createAsset(){
    //1. 获取文件内容
     // @babel/parser ast => 抽象语法树
    //2. 获取依赖关系
    const source = fs.readFileSync('./example/main.js',{
        encoding:'utf-8'
    });
    const ast = parser.parse(source,{
        sourceType:'module'
    });
    // console.log(ast.program.body);
    // console.log(traverse);
    const depts = [];
    traverse.default(ast,{
        ImportDeclaration({node}){
            console.log(node.source);
            console.log('执行-----------------------------');
        }
    })
    return {};
}
createAsset();