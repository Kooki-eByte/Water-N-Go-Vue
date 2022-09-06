import argon2 from "argon2";
import debug from "debug";
import shortid from "shortid";
import MongooseConfig from "../../common/mongoose.config";
import { IUserDto } from "./../../interfaces/IUserDto";

const logger: debug.IDebugger = debug("app:users-dao");

class UserDao {
  // This defines our MongoDB collection with user
  schema = MongooseConfig.getMongoose().Schema;

  // The select: false in the password field will hide this field whenever we get a user or list all users.
  userSchema = new this.schema(
    {
      _id: String,
      email: String,
      password: { type: String, select: false },
      firstName: String,
      lastName: String,
      phoneNumber: String,
      permissionFlags: Number,
    },
    { id: false }
  );

  User = MongooseConfig.getMongoose().model("Users", this.userSchema);

  constructor() {
    logger("Created new instance of UsersDao");
  }

  async addUser(user: IUserDto) {
    logger("Adding new user");
    const userId = shortid.generate();
    const newUser = new this.User({
      _id: userId,
      ...user,
      permissionFlags: 1,
    });
    await newUser.save();
    return userId;
  }

  async getUsers() {
    return this.User.find().exec();
  }

  async getUserById(userId: string) {
    return this.User.findById(userId).exec();
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async updateUserById(userId: string, user: IUserDto) {
    user.password = await argon2.hash(user.password);
    logger(`Users-DAO:user object: ${user}`);

    const existingUser = this.User.findByIdAndUpdate(
      userId,
      { $set: user },
      { new: true }
    ).exec();

    return existingUser;
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }
}

export default new UserDao();
