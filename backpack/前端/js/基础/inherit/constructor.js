function log(x){
    console.log(x)
}
/**
 * new 做了什麼
 * 1. 創建一個空對象 {}
 * 2. 將this指向這個空對象(將構造函數的作用於賦值給新對象)
 * 3. 執行構造函數,給空對象添加屬性
 * 4. 返回這個對象
 */
class Point {
    constructor(){
        return Object.create(null);
    }
}

log(new Point() instanceof Point);