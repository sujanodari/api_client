export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.APP_HOSTNAME,
  csvFile: process.env.CSV_FILE_NAME,
  env: process.env.NODE_ENV,
  frontEndUrl: process.env.FRONTEND_URL,
});
