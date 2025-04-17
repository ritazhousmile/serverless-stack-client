#!/bin/bash

# Production build
export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# Deploy to S3
aws s3 sync build/ s3://notes-app-client-zhouhuan-20250417 --delete

# Create CloudFront cache invalidation
aws cloudfront create-invalidation --distribution-id E1U327N2O939Z8 --paths "/*"

echo "Deployment and cache invalidation completed!"
echo "Website is accessible at:"
echo "CloudFront (HTTPS): https://d1m799resc27v.cloudfront.net"
echo "S3 (HTTP): http://notes-app-client-zhouhuan-20250417.s3-website-us-east-1.amazonaws.com" 