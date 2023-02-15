var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (right >= left) {
    let mid = left + parseInt((right - left) / 2);
    console.log(left, mid, right);
    if (nums[mid] === target) {
      console.log(mid);
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return -1;
};

search([-1, 0, 3, 5, 9, 12], 2);
