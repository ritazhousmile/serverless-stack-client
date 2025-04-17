# 部署文档

## 部署信息

- **S3 存储桶**: notes-app-client-zhouhuan-20250417
- **S3 网站 URL**: http://notes-app-client-zhouhuan-20250417.s3-website-us-east-1.amazonaws.com
- **CloudFront 分发 ID**: E1U327N2O939Z8
- **CloudFront 域名**: d1m799resc27v.cloudfront.net
- **CloudFront URL**: https://d1m799resc27v.cloudfront.net
- **API 端点**: https://iqd2ao0kw2.execute-api.us-east-1.amazonaws.com

## 部署流程

要更新网站，请按照以下步骤操作：

1. 进行代码更改
2. 运行部署脚本：
   ```
   ./cloudfront-invalidation.sh
   ```

或者手动执行以下命令：

```bash
# 生产构建
export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# 部署到 S3
aws s3 sync build/ s3://notes-app-client-zhouhuan-20250417 --delete

# 创建 CloudFront 缓存失效
aws cloudfront create-invalidation --distribution-id E1U327N2O939Z8 --paths "/*"
```

## CloudFront 设置

- **源站**: S3 网站端点 (notes-app-client-zhouhuan-20250417.s3-website-us-east-1.amazonaws.com)
- **价格类**: 使用所有边缘位置（最佳性能）
- **支持的 HTTP 版本**: HTTP/2, HTTP/1.1, HTTP/1.0
- **默认根对象**: index.html

## 注意事项

1. CloudFront 分发更改可能需要 15-30 分钟才能全球传播
2. 创建缓存失效后，可能需要几分钟才能看到更新的内容
3. 始终在本地测试更改，然后再部署到生产环境 