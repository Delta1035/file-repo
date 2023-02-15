/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
 var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
     return function (n) {
        if (n <= 1) {
          return n
        }
    
        let right = n
        let left = 0
        let targetVersion
    
        while (!targetVersion) {
          const mid = left + Math.floor((right - left) / 2)
          //  是bad
          if (isBadVersion(mid)) {
            //  上一个人仍然是bad，往左移动
            if(isBadVersion(mid - 1)) {
              right = mid
            }
            //  上一个不是bad
            else {
              targetVersion = mid;
            }
          }
          //  不是bad，往右移动
          else {
            left = mid + 1
          }
        }
    
        return targetVersion
      }
    

};