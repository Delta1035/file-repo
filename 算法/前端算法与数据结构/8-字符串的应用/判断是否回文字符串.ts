
/**
 * 判断是否回文字符串
 * @param str 
 * @returns boolean
 */
export function isPalindrome (str: string): boolean {
    const len = str.length;
    for (let i = 0; i < len / 2; i += 1) {
        if (str[i] === str[len - i - 1]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome('123221'));
