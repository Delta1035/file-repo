/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    var res = []
    var i = 0;
    var length = nums.length;

    const oldNum = []; // 存放已经用过的数字

    while(i<=length){
        var current = nums[i]
        oldNum.push(current);
        

        i++;
        oldNum.pop();
    }
};


permute([1,2,3])