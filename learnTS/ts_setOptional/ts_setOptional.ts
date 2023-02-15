// 如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的

type Foo = {
    a: number;
    b?: string;
    c: boolean;
}

// type SetOptional = Partial<Foo>;

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;


//获取处理完的交叉类型
type SetOptional <T , K extends keyof T> = Partial<Pick<T , K>> & Pick< T, Exclude<keyof T ,K>>
//数组扁平处理
type Flattening <T> = 
{[P in keyof T] : T[P]}
//最终版本
// type Flattening <T> = 
// {[P in keyof T] : T[P]}
// ​
// type SetOptional <T , K extends keyof T> = 
// Flattening<Partial<Pick<T , K>> & Pick< T, Exclude<keyof T ,K>>>
