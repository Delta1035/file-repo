# // 创建云虚拟机
# resource "tencentcloud_instance" "cvm_linux" {
#   instance_name = "win-server"
#   #   availability_zone = var.region
#   // 由腾讯云提供的镜像 https://console.cloud.tencent.com/cvm/image/index?rid=16&imageType=PUBLIC_IMAGE
#   image_id = "img-ieb3k16j"
#   #   instance_disk_type = "S2.SMALL1"
#   system_disk_type   = "CLOUD_PREMIUM"
#   allocate_public_ip = true

#   security_groups = [tencentcloud_security_group.security_group_shanghai.id]
#   vpc_id          = tencentcloud_vpc.vpc_shanghai.id
#   subnet_id       = tencentcloud_subnet.subnet_shanghai_01.id
#   count           = 2
#   tags = {
#     "role" = "cgi"
#     "env"  = "prod"
#   }
# }
