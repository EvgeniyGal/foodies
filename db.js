import mongoose from 'mongoose';
import 'dotenv/config';

const { NODE_ENV, DEV_DB_URL, TEST_DB_URL, PROD_DB_URL } = process.env;

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
  switch (NODE_ENV) {
    case 'test':
      return TEST_DB_URL;
    case 'dev':
      return DEV_DB_URL;
    case 'prod':
      return PROD_DB_URL;
    default:
      return DEV_DB_URL;
  }
}
