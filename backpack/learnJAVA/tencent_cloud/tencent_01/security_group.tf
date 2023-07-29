resource "tencentcloud_security_group" "security_group_shanghai" {
  name = "security_group_shanghai"
}

// 创建安全组规则1
resource "tencentcloud_security_group_rule" "security_group_shanghai_rule1" {
  security_group_id = tencentcloud_security_group.security_group_shanghai.id
  type              = "ingress"
  cidr_ip           = "0.0.0.0/0"
  ip_protocol       = "tcp"
  port_range        = "22,80"
  policy            = "accept"
}
