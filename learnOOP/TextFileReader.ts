class TextReader {
    constructor(pathName: string) {
    }
    public open (pathName: string): void { }

    public close (): void { }

    public read (): string { return ''; }
}

// class TextFileReader {
//     // 正在访问的文件编号
//     private fileNum?: number;
//     constructor(pathName: string) { }
//     public open (pathName: string): void {

//     }

//     public close (): void {

//     }

//     public read (): string {
//         return '';
//     }
// }

class NetworkReader extends TextReader {
    private fileNum?: number;
    constructor(pathName: string) {
        super(pathName);
    }
}

class TextFileReader extends TextReader {
    // 正在访问的文件编号
    private fileNum?: number;
    constructor(pathName: string) {
        super(pathName);
    }
}

function getCount (reader: TextReader) {
    let count = 0;
    while (true) {
        const str = reader.read();
        count++;
    }
}

