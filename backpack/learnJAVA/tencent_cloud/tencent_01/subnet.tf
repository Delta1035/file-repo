resource "tencentcloud_subnet" "subnet_shanghai_01" {
  name              = "subnet_shanghai_01"
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-shanghai-1"
  vpc_id            = tencentcloud_vpc.vpc_shanghai.id
  route_table_id    = tencentcloud_route_table.route_table_vpc_shanghai.id
}

resource "tencentcloud_subnet" "subnet_shanghai_02" {
  name              = "subnet_shanghai_02"
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-shanghai-2"
  vpc_id            = tencentcloud_vpc.vpc_shanghai.id
  route_table_id    = tencentcloud_route_table.route_table_vpc_shanghai.id
}


resource "tencentcloud_subnet" "subnet_shanghai_03" {
  name              = "subnet_shanghai_03"
  cidr_block        = "10.0.3.0/24"
  availability_zone = "ap-shanghai-3"
  vpc_id            = tencentcloud_vpc.vpc_shanghai.id
  route_table_id    = tencentcloud_route_table.route_table_vpc_shanghai.id
}


resource "tencentcloud_subnet" "subnet_shanghai_04" {
  name              = "subnet_shanghai_04"
  cidr_block        = "10.0.4.0/24"
  availability_zone = "ap-shanghai-4"
  vpc_id            = tencentcloud_vpc.vpc_shanghai.id
  route_table_id    = tencentcloud_route_table.route_table_vpc_shanghai.id
}

