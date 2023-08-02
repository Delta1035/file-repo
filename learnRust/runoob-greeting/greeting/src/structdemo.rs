struct Site {
    domain: String,
    name: String,
    nation: String,
    found: u32,
}
// 元组结构体
struct Color(u8, u8, u8);
struct Point(f64, f64);
pub fn create_instance() {
    let site = Site {
        domain: String::from("localhost"),
        name: String::from("菜鸟教程"),
        found: 2023,
        nation: todo!(),
    };

    let black = Color(3, 3, 3);
    let origin = Point(0.1, 0.2);
    println!(
        "value of black 1 : {}, value of origin 1 {}, value of site name :{}",
        black.1, origin.1, site.name
    )
}
