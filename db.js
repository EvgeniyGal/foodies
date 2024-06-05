import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const {PORT, NODE_ENV, TEST_DB_URL, DEV_DB_URL, PROD_DB_URL } = process.env;

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


if (NODE_ENV === 'prod' || NODE_ENV === 'dev') {
  await db();

  app.listen(PORT, () => {
    console.log(
      `App running. Use our API on port: ${PORT}`
    );
  });
}
