// 示例 1: 输入: "aba"
// 输出: True
// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。
// 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。let promise = Promise.reject(new Error("Promise Failed!"));

function validPalindrome (s: string): boolean {
    const len = s.length;
    let i = 0,
        j = len - 1;
    while (i < j && s[i] === s[j]) {
        // 左指针一定要小于右指针，且对应的字符相等
        i += 1;
        j -= 1;
    }

    // 当不相等时，说明不是回文了，这时需要去判断跳过一个字符能否构成回文
    if (isPalindrome(i + 1,j)) {
        return true;
    }

    if (isPalindrome(i,j - 1)) {
        return true;
    }

    function isPalindrome (start: number,end: number): boolean {
        while (start < end) {
            if (s[start] !== s[end]) {
                return false;
            }
            start += 1;
            end -= 1;
        }

        return true;
    }

    return false;
}
console.log(validPalindrome("abcaa"));
