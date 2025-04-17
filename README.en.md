# Deployment Documentation

## Deployment Information

- **S3 Bucket**: notes-app-client-zhouhuan-20250417
- **S3 Website URL**: http://notes-app-client-zhouhuan-20250417.s3-website-us-east-1.amazonaws.com
- **CloudFront Distribution ID**: E1U327N2O939Z8
- **CloudFront Domain**: d1m799resc27v.cloudfront.net
- **CloudFront URL**: https://d1m799resc27v.cloudfront.net
- **API Endpoint**: https://iqd2ao0kw2.execute-api.us-east-1.amazonaws.com

## Deployment Process

To update the website, follow these steps:

1. Make code changes
2. Run the deployment script:
   ```
   ./cloudfront-invalidation.sh
   ```

Alternatively, execute these commands manually:

```bash
# Production build
export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# Deploy to S3
aws s3 sync build/ s3://notes-app-client-zhouhuan-20250417 --delete

# Create CloudFront cache invalidation
aws cloudfront create-invalidation --distribution-id E1U327N2O939Z8 --paths "/*"
```

## CloudFront Settings

- **Origin**: S3 website endpoint (notes-app-client-zhouhuan-20250417.s3-website-us-east-1.amazonaws.com)
- **Price Class**: Use all edge locations (best performance)
- **Supported HTTP Versions**: HTTP/2, HTTP/1.1, HTTP/1.0
- **Default Root Object**: index.html

## Notes

1. CloudFront distribution changes may take 15-30 minutes to propagate globally
2. After creating a cache invalidation, it may take a few minutes to see updated content
3. Always test changes locally before deploying to production 