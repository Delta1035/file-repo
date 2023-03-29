var sortedSquares = function (nums) {
    // var temp = [nums[0]**2];
    var temp = [];
    for (var i = 0; i <= nums.length - 1; i++) {
        temp.push(nums[i] ** 2)
    };
    temp.sort(function (a, b) {
        return a - b;
    });
    return temp;
}
    console.log(sortedSquares([-4,-1,0,3,10]));