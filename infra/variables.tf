variable "region" {
  type        = string
  description = "The AWS Region to use"
  default     = "us-east-1"
}
variable "file_name" {
  type        = string
  description = "The name for the index"
  default     = "index.html"
}
