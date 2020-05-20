
const rootUrl = new URL(process.env.ROOT_URL || 'http://localhost:8080');

if (!process.env.MONGO_URL) {
  console.error('[ERROR] Please provide a MONGO_URL via env variable (e.g. mongodb://localhost:27017/sketch_db).');
  process.exit();
}


export default {
  rootPort: rootUrl.port,
  rootHostname: rootUrl.hostname,
  rootUrl: rootUrl.toString(),
  mongoUrl: process.env.MONGO_URL,

  isDev: process.env.NODE_ENV !== 'production',
};
