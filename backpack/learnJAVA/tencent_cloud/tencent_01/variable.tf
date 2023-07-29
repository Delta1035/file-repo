# variable "default" {
#   type = list(object({
#     region     = string
#     secret_id  = string
#     secret_key = string
#   }))
#   default = [{
#     region     = "ap-shanghai"
#     secret_key = "i9KFvLUMyKQGp7IJ4lGWWHo6A1hRwGK7"
#     secret_id  = "AKIDGJBm7EJ7dsrZ0eEZfV7bx5wZw5ycIkxt"
#   }]

# }

variable "region" {
  type    = string
  default = "ap-shanghai"
}

variable "secret_key" {
  type    = string
  default = "i9KFvLUMyKQGp7IJ4lGWWHo6A1hRwGK7"
}

variable "secret_id" {
  type    = string
  default = "AKIDGJBm7EJ7dsrZ0eEZfV7bx5wZw5ycIkxt"
}
