// type Exclude<T, U> = T extends U ? never : T
// 在 T 类型中，去除 T 类型和 U 类型的交集，返回剩余的部分
type T1 = Exclude<"a" | "b" | "c", "a" | "b" | "e">;   // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
