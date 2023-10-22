// // 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

const leftToRight = {
    '(': ')',
    '{': '}',
    '[': ']'
} as const;

function isValidBracket (str: string): boolean {
    if (str.trim() === '') { // 空字符串为true
        return true;
    }
    const stack: Array<string> = [];// 当遍历到左括号时 扔进去,遍历到右括号时拿栈顶匹配,如果匹配成功则丢掉,继续遍历匹配
    const len = str.length;
    for (let i = 0; i < len; i += 1) {
        const char = str[i] as keyof typeof leftToRight;
        if (Object.keys(leftToRight).includes(char)) {
            stack.push(leftToRight[char]);
        } else {
            if (stack.length > 0 && stack.pop() !== char) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

console.log(
    isValidBracket('{[))]}'),
    isValidBracket('{[()]}'),
    isValidBracket('()[]{}'),

);