#!/bin/bash

# 生产构建
export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# 部署到 S3
aws s3 sync build/ s3://notes-app-client-zhouhuan-20250417 --delete

# 创建 CloudFront 缓存失效
aws cloudfront create-invalidation --distribution-id E1U327N2O939Z8 --paths "/*"

echo "部署和缓存失效已完成！"
echo "网站可以通过以下地址访问:"
echo "CloudFront (HTTPS): https://d1m799resc27v.cloudfront.net"
echo "S3 (HTTP): http://notes-app-client-zhouhuan-20250417.s3-website-us-east-1.amazonaws.com" 