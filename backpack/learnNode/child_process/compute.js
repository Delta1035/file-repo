
function getSum(){
    let sum = 0;
    for(let i=0;i<10000;i++){
        sum+=i;
    }
    return sum;
}

process.on('message',(msg)=>{
    console.log('子进程 id',process.pid);
    console.log('子进程接受到的信息',msg);
    const result = getSum();
    process.send(result);
})