# terraform {
#   required_providers {
#     source = "https://intl.cloud.tencent.com/"
#     # 通过version指定版本
#     # version = ">=1.60.18"
#   }
# }
# provider "tencentcloud" {
#   region = "server-shanghai"
#   #   secret_id  = "AKIDGJBm7EJ7dsrZ0eEZfV7bx5wZw5ycIkxt"
#   #   secret_key = "i9KFvLUMyKQGp7IJ4lGWWHo6A1hRwGK7"
# }

terraform {
  required_providers {
    tencentcloud = {
      source  = "tencentcloudstack/tencentcloud"
      version = "1.72.5"
    }
  }
}

provider "tencentcloud" {
  # Configuration options
  region     = var.region
  secret_id  = var.secret_id
  secret_key = var.secret_key
}
