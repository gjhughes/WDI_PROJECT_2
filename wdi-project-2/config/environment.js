module.exports = {
  port: 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/find-craftdb',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt'
};
