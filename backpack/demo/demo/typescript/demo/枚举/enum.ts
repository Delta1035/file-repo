enum Days {sun=5,mon=1,tue,wed,thu,fri,sat};//手动赋值的时候枚举会从7开始递增
//sun 被后面的 sat 覆盖了  但是从枚举值到枚举名反射的时候,枚举名是没有重复的
// {
//     '1': 'mon',
//     '2': 'tue',
//     '3': 'wed',
//     '4': 'thu',
//     '5': 'fri',
//     '6': 'sat',
//     sun: 5,
//     mon: 1,
//     tue: 2,
//     wed: 3,
//     thu: 4,
//     fri: 5,
//     sat: 6
//   }
console.log(Days);
interface obj {
    age:number;
    name:string;
}

