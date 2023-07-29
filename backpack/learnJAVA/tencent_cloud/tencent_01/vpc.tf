//创建 main.tf 文件，配置腾讯云 Provider 并创建私有网络 VPC。文件内容如下：
resource "tencentcloud_vpc" "vpc_shanghai" {
  name = "vpc_shanghai" // vpc的名称
  /**
  * 一个网络地址块, 是三个内部网段的子网
  * 10.0.0.0/16、172.16.0.0/12和192.168.0.0/16的子网
  */
  cidr_block   = "10.0.0.0/16"
  dns_servers  = ["119.29.29.29", "8.8.8.8"] // 配置dns服务器
  is_multicast = false                       //是否多播
  tags = {
    "test" = "test"
  }
}
