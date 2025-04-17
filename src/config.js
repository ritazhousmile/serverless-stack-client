export default {
  STRIPE_KEY: "pk_test_2xhtA6Mpoc0Jel1FkVdHk0p0007sS5PzcS",
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "scratch-note-upload"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: process.env.REACT_APP_API_URL || "https://iqd2ao0kw2.execute-api.us-east-1.amazonaws.com"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-2_BQtCmFYN3",
    APP_CLIENT_ID: "4ckhhratrb7lk0rn31c5rhf75d",
    IDENTITY_POOL_ID: "us-east-2:0c34464a-3b12-438c-8ad3-f6afb8fcf384"
  }
};
