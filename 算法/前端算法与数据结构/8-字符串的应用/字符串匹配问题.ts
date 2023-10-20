
class WordDictionary {
    words: Map<number,Array<string>>;
    constructor() {
        this.words = new Map();
    }

    /**
     * 根据字符串长度的不同添加到不同的键值对
     * @param word 
     */
    addWord (word: string): void {
        const len = word.length;
        // if (this.words.has(len)) {
        //     const value = this.words.get(len);
        //     if (value && !value.find((item) => { item === word; })) {
        //         value.push(word);
        //     }
        // }
        if (this.words.has(len)) {
            this.words.get(len)?.push(word);
        } else {
            this.words.set(len,[word]);
        }
    }

    search (word: string): boolean {
        const len = word.length;
        if (!this.words.has(len)) {
            return false;
        }
        if (!word.includes('.')) {
            const targetWords = this.words.get(len);
            return targetWords ? targetWords.includes(word) : false;
        }
        return false;
    }
}