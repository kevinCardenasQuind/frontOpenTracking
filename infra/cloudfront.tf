resource "aws_cloudfront_origin_access_identity" "oai_demo" {
  comment = "Default CloudFront Origin Access Identity"
}

resource "aws_cloudfront_distribution" "distribution" {
  depends_on = [
    aws_s3_bucket.buckets3,
    aws_cloudfront_origin_access_identity.oai_demo
  ]

  enabled             = true
  default_root_object = local.bucket_archive_name

  origin {
    domain_name = aws_s3_bucket.buckets3.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.buckets3.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai_demo.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.buckets3.id
    viewer_protocol_policy = "allow-all"
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "DELETE", "PATCH"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "CO"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
