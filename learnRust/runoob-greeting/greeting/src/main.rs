mod structdemo;
use structdemo::create_instance;
fn main() {
    let a = 12;
    println!("a is {}", a);
    // print!("{{}}");
    // for_in();
    // for_in_key();
    // loop_find();
    // owner
    let mut s1: String = String::from("hello moto");
    let part1: &str = &s1[0..3];
    let part2: &str = &s1[3..];
    println!("{} + {} = {}", part1, part2, s1);
    s1.push_str("this is a string been pushed");
    println!("value of s1 {}", s1);

    let mut s = String::from("runoob");
    let slice = &s[0..3];
    println!("slice = {}", slice);
    s.push_str("yes!"); // 错误
    create_instance()
}

// fn change_bettal(value: i8) -> i8 {
//     if value > 3 {
//         return 3;
//     } else {
//         return 3;
//     }
// }
// fn add(a: i32, b: i32) -> i32 {
//     return a + b;
// }

// fn for_in() {
//     let a = [10, 20, 30];
//     for v in a.iter() {
//         println!("value is {}", v)
//     }
// }

// fn for_in_key() {
//     let a = [10, 20, 30];
//     for k in 0..3 {
//         println!("value is {}", a[k])
//     }
// }

// fn loop_find() {
//     let s = ['R', 'U', 'N', 'O', 'O', 'B'];
//     let mut i = 0;
//     let location = loop {
//         let ch = s[i];
//         if ch == 'O' {
//             break i;
//         }

//         i += 1;
//     };
//     println!("\'O\'的索引是 {}", location)
// }
