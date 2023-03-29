// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const diffs = new Map();
  for (let i = 0; i < nums.length; i++) {
    const n = target - nums[i];
    if (diffs.get(n) !== undefined) {
      return [diffs.get(n), i];
    }
    diffs.set(nums[i], i);
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
