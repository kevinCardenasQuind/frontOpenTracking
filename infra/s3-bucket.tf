locals {
  bucket_name_prefix       = local.project_dashcase_name
  bucket_code_path         = "${path.module}/../build/index"
  bucket_archive_name      = var.file_name
  bucket_content_type      = "text/html"
  bucket_archive_path      = "#{GITHUB_WORKSPACE}#/build"
  bucket_description       = "Bucket for static website files"
  bucket_server_encryption = "AES256"
}

resource "aws_s3_bucket" "buckets3" {
  bucket        = "${local.project_dashcase_name}-bucket"
  force_destroy = true
  tags = merge(
    local.common_tags,
    {
      NameBucket = "${local.bucket_name_prefix}-bucket"
    }
  )
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encrypt" {
  bucket = aws_s3_bucket.buckets3.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = local.bucket_server_encryption
    }
  }
}

resource "aws_s3_bucket_public_access_block" "pab" {
  bucket                  = aws_s3_bucket.buckets3.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "versioning_demo" {
  bucket = aws_s3_bucket.buckets3.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_object" "content" {
  for_each = fileset("${local.bucket_archive_path}", "**")
  bucket                 = aws_s3_bucket.buckets3.id
  key                    = each.key
  source                 = "${local.bucket_archive_path}/${each.key}"
  server_side_encryption = local.bucket_server_encryption
  content_type           = local.bucket_content_type
  etag = filemd5("${local.bucket_archive_path}/${each.key}")
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.buckets3.id
  index_document {
    suffix = local.bucket_archive_name
  }
}
