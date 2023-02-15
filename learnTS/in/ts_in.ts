type Word = {
    name:number
}
type Man<T> = {
    [key in keyof T]:string
}

const man1:Man<{age:number,address:string}> = {
    age: '2',
    address: '3'
}