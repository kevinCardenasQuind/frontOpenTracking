data "aws_iam_policy_document" "s3_policy_data" {
  depends_on = [
    aws_s3_bucket.buckets3,
    aws_cloudfront_distribution.distribution
  ]

  statement {
    actions = ["s3:GetObject"]
    resources = [
      aws_s3_bucket.buckets3.arn,
      "${aws_s3_bucket.buckets3.arn}/*"
    ]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai_demo.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "s3_policy" {
  depends_on = [
    data.aws_iam_policy_document.s3_policy_data
  ]
  bucket = aws_s3_bucket.buckets3.id
  policy = data.aws_iam_policy_document.s3_policy_data.json
}
