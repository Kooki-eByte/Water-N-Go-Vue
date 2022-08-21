import debug from "debug";
import mongoose from "mongoose";

const logger: debug.IDebugger = debug("app:mongoose-config");

class MongooseConfig {
  private _count = 0;

  private _mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    logger("Attempting MongoDB connection!");
    mongoose
      .connect("mongodb://localhost:27017/waterngo", this._mongooseOptions)
      .then(() => {
        logger("MongoDB is connected!");
      })
      .catch((err) => {
        const retrySeconds = 5;
        logger(
          `MongoDB connection unsuccessful (will retry #${++this
            ._count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseConfig();
