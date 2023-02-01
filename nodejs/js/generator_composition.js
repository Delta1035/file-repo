// generator 组合
// generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 
// generator 彼此“嵌入（embed）”到一起。

function* generatorSequence(start,end){
    for(let i = start;i<=end;i++) yield i;
}

function* g(){
    yield* generatorSequence(48,57);

    yield* generatorSequence(65,90);

    yield* generatorSequence(97,122);

}

for(let i of g()){
    console.log(String.fromCharCode(i));
}