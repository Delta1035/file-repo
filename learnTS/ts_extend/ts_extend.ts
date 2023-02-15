type User = {
    id: number;
    kind: string;
};

function makeCustomer<T extends User>(u: T): T {
    return {
        ...u,// 代表T 类型相比 User 多出来的类型
        id: u.id,
        kind: 'customer'
    }
}
// extends 的含义是类型约束， T 受到 User的约束，必须包含User 中规定的类型，但是 T 类型比User类型范围更广泛