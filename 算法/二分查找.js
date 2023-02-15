/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

//  输入: nums = [-1,0,3,5,9,12], target = 9
//  输出: 4
//  解释: 9 出现在 nums 中并且下标为 4

// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
// 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

var search = function (nums, target) {
    var result = -1;
    var left = 0;
    var right = nums.length - 1;
    var mid;
    while (right >= left) {
        if (right === left) {
            mid = left;
        } else {
            mid = Math.floor((right - left) / 2 + left);
        }
        console.log(left, mid, right);// 5 3 4
        if (nums[mid] === target) {
            console.log('测试',mid, nums[mid], target);
            return mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }
    return result;
};
// [-1,0,3,5,9,12]
// 2
const loca = search([-1, 0, 3, 5, 9, 12], 2);
console.log(loca);