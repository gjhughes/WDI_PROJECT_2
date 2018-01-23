module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODD_URI || 'mongodb://localhost/find-craftdb',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt',
};
