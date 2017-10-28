import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env
  .MONGO_PASSWORD}@${process.env.MONGO_ADDRESS}`;

mongoose.Promise = global.Promise;

mongoose.connect(uri, { useMongoClient: true, reconnectTries: 30 });

mongoose.connection.on('connecting', () => {
  console.dir({ Mongo: 'connecting..' }, { colors: true });
});

mongoose.connection.on('connected', () => {
  console.dir({ Mongo: 'connected' }, { colors: true });
});

mongoose.connection.on('reconnected', () => {
  console.dir({ Mongo: 'reconnected' }, { colors: true });
});

mongoose.connection.on('disconnected', () => {
  console.dir({ Mongo: 'disconnected' }, { colors: true });
});

mongoose.connection.on('error', err => {
  console.log('Mongoose failed to connect: ', err);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('DB disconnected through terminal');
    process.exit(0);
  });
});

export default mongoose;
