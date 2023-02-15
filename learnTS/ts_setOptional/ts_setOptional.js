"use strict";
// 如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的
//最终版本
// type Flattening <T> = 
// {[P in keyof T] : T[P]}
// ​
// type SetOptional <T , K extends keyof T> = 
// Flattening<Partial<Pick<T , K>> & Pick< T, Exclude<keyof T ,K>>>
