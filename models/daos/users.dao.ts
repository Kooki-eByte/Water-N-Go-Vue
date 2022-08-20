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
    this.users.push(user);
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    let data = null;

    this.users.find((user: IUserDto) => {
      if (user.id !== userId) return;
      data = user;
    });

    return data;
  }

  async getUserByEmail(email: string): Promise<IUserDto | null> {
    let data = null;

    this.users.find((user: IUserDto) => {
      if (user.email !== email) return;
      data = user;
    });

    return data;
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
