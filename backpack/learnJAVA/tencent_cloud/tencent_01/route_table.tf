// 配置路由表
resource "tencentcloud_route_table" "route_table_vpc_shanghai" {
  vpc_id = tencentcloud_vpc.vpc_shanghai.id
  name   = "route_table_vpc_shanghai"
}
