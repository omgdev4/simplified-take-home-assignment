import config from "config";
import logger from './logger';
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = config.get("mongoURI");
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
