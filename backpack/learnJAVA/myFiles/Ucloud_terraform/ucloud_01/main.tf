terraform {
    # 配置provider
    required_providers{
        ucloud = {
            source = "ucloud/ucloud"
            version = "~>1.22.0"
        }
    }
}

provider "ucloud" {
  public_key = var.ucloud_public_key
  private_key = var.ucloud_private_key
  project_id = var.project_id
  region = ""
}