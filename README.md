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



-----------------------------------------------------------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
