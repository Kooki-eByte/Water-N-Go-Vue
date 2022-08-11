import debug from "debug";
import shortid from "shortid";
import { IUserDto } from "./../../interfaces/IUserDto";

const logger: debug.IDebugger = debug("app:in-memory-dao");

class UserDao {
  users: Array<IUserDto> = [];

  constructor() {
    logger("Created new instance of UsersDao");
  }

  async addUser(user: IUserDto) {
    user.id = shortid.generate();
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => {
      user.id === userId;
    });
  }

  async getUserByEmail(email: string) {
    const index = this.users.findIndex((user: { email: string }) => {
      user.email === email;
    });

    let currentUser = this.users[index];

    return currentUser ? currentUser : null;
  }

  async updateUserById(userId: string, user: IUserDto) {
    const index = this.users.findIndex((user: { id: string }) => {
      user.id === userId;
    });

    this.users.splice(index, 1, user);

    return `${user.id} updated successfully`;
  }

  async removeUserById(userId: string) {
    const index = this.users.findIndex((user: { id: string }) => {
      user.id === userId;
    });

    this.users.splice(index, 1);

    return `${userId} removed successfully`;
  }
}

export default new UserDao();
