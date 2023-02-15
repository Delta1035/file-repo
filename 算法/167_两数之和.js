// 给定一个已按照 非递减顺序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。

// 函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。

// 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

// 输入：numbers = [2,7,11,15], target = 9
// 输出：[1,2]
// 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。



/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    var index1 = -1;
    var index2 = -1;
    var len = numbers.length;
    var first = 0;
    var left = first +1;
    var right = len-1;
    var mid = Math.floor((right-left)/2)+left;
    for(var i=0;i<len;i++){
        first = i;
        console.log(first,left,mid,right);
        while(right>=left){
            mid = Math.floor((right-left)/2)+left;
            var sum = (numbers[mid]+numbers[first]);
            console.log(sum,target);
            if(sum === target){
                index1 = first+1;
                index2 = mid+1;
                return [index1,index2]
            }else if(sum > target){
                right = mid -1;
            }else if(sum < target){
                left = mid +1;
            }
        }
    }
    return [index1,index2];
};

console.log(twoSum([5,25,75], 100));
