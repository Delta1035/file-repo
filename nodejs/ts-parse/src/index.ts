import fs from 'fs';
import path from 'path';
import * as ts from 'typescript';
const filePath = path.join(__dirname,'./pj-button-group.component.ts');
const sourceCode = fs.readFileSync(filePath,{ encoding: 'utf-8' });
// console.log(ts.parseJsonText(filePath,'text'));

// 创建 TypeScript 编译器选项
const compilerOptions: ts.CompilerOptions = {};
/**
 * 周二~周五 任务安排
 * 1.代码重构,公共类提取,属性访问方法调整
 * 2.页面文字静态资源提取到公共对应的多语言json文件
 */
// 解析 TypeScript 文件为 AST
const sourceFile = ts.createSourceFile(
    'test.ts',
    sourceCode,
    ts.ScriptTarget.Latest,
    true
);
console.log(sourceFile.getText());
// 遍历并修改 AST
function visitAndModify(node: ts.Node): ts.Node {
    // 在这里进行对 AST 节点的修改
    if (ts.isIdentifier(node) && node.text === 'originalName') {
      // 修改标识符名称为 'newName'
      return NodeFactory.createIdentifier('newName');
    }
  
    // 递归遍历子节点
    return ts.visitEachChild(node, visitAndModify, null);
  }
  
// 打印 AST
function printAST (node: ts.Node,indent: number = 0) {
    console.log(' '.repeat(indent),ts.SyntaxKind[node.kind]);
    ts.forEachChild(node,(child) => printAST(child,indent + 2));
}

// 输出 AST
printAST(sourceFile);