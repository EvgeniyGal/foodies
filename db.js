import mongoose from 'mongoose';

export const db = () =>
  mongoose
    .connect(getDbUrl())
    .then(() => {
      console.log('Database connection successful');
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });

export const closeDb = () => mongoose.connection.close();

function getDbUrl() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return process.env.TEST_DB_URL;
    case 'dev':
      return process.env.DEV_DB_URL;
    case 'prod':
      return process.env.PROD_DB_URL;
    default:
      return process.env.DEV_DB_URL;
  }
}
