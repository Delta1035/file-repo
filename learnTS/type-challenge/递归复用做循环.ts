// RemoveItem 删除指定项, 返回新的数组
type RemoveItem<Arr extends unknown[],target,Result extends unknown[] = []> = 
Arr extends [infer first,...infer rest] ? 
first extends target ? [...rest,...Result] : RemoveItem<rest,target,[first,...Result]> :[]

type R1 = RemoveItem<[1,2,3],2,[]>;
type R2 = RemoveItem<[1,2,3],1,[]>;

// BuildArray 构造指定类型数组
type BuildArray<length extends number,ele extends unknown,result extends unknown[] = []>=
result['length'] extends length ? result : BuildArray<length,ele,[...result,ele]>
type b1 = BuildArray<3,string>

// replaceAll 递归替换字符串
// type ReplaceAll<str extends string,from extends string,to extends string> = 
// str extends `${infer left}${infer mid}${infer right}` ? 
// left extends from ? ReplaceAll<`${}`

