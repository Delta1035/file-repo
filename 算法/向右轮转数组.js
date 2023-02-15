/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    //超时了
    // for(var i=1;i<=k;i++){
    //     nums.unshift(nums.pop(nums.length-1));
    // }
    // return nums;
    let reverse = (nums, start, end) => {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
        return nums;
    };
    // 细节点在于 如果k要比现在nums.length还要长，所以需要取余
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
};


console.log(rotate([-1, -100, 3, 99], 2));