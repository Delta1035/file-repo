const arr = [1,2,3];
arr.sort((a,b) => b - a);
// console.log(arr);


/**
 * 1. 基础排序算法
 * - 冒泡排序
 * - 插入排序
 * - 选择排序
 * 2. 进阶排序算法
 * - 归并排序
 * - 快速排序
 */
// [5, 3, 2, 4, 1] small => big
function bubbleSort (arr: number[]): number[] {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let flag = false;
        for (let j = 0; j < len - i - 1; j++) { // TIP 减去1 是因为倒数第二个就已经对比了所有的数据 
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]];
            }
        }

    }
    return arr;
}
console.time();
console.log('冒泡排序:>>',bubbleSort([5,3,2,4,1]));
console.timeEnd();


function selectSort (arr: number[]): number[] {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        `   `;

        for (let j = 0; j < len; j++) {

        }
    }

    return arr;
}