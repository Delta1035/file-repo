namespace Validation { //放在Validaion命名空间,而不是全局命名空间
    export interface StringValidator { // 如果要让接口和类在命名空间外也能使用, 所以需要export
        isAcceptable(s: string): boolean;
    }
    // lettersRegexp 和 numberRegexp属于实现的细节, 不需要导出
    let lettersRegexp = /^[A-Za-z]+$/;
    let numberRegexp = /^[0-9]+$/;

    // export class LettersOnlyValidator implements StringValidator {
    //     isAcceptable(s: string) {
    //         return lettersRegexp.test(s);
    //     }
    // }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }

    // Some samples to try
    let strings = ["Hello", "98052", "101"];

    // Validators to use
    let validators: { [s: string]: StringValidator; } = {};
    validators["ZIP code"] = new ZipCodeValidator();
    validators["Letters only"] = new LettersOnlyValidator();
    // 在文件末尾的测试代码里，由于是在命名空间之外访问，
    // 因此需要限定类型的名称，比如 Validation.LettersOnlyValidator。

    // Show whether each string passed each validator
    for (let s of strings) {
        for (let name in validators) {
            let isMatch = validators[name].isAcceptable(s);
            console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
        }
    }
}