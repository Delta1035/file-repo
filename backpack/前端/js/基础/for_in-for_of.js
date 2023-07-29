const proto = {
    name:'zhansgan',
    age:'18',
}
const obj = Object.assign(proto,{sex:'nan'});
for(const ele in obj){
    console.log(ele);
}