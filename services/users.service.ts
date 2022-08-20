import { ICRUD } from "../interfaces/ICRUD";
import { IUserDto } from "../interfaces/IUserDto";
import UsersDao from "../models/daos/users.dao";

class UserService implements ICRUD {
  async create(resource: IUserDto) {
    return UsersDao.addUser(resource);
  }

  async deleteById(id: string) {
    return UsersDao.removeUserById(id);
  }

  async getAll(limit: number, page: number) {
    return UsersDao.getUsers();
  }

  async getById(id: string) {
    return UsersDao.getUserById(id);
  }

  async putById(id: string, resource: IUserDto) {
    return UsersDao.updateUserById(id, resource);
  }

  async getUserByEmail(email: string): Promise<IUserDto | null> {
    return UsersDao.getUserByEmail(email);
  }
}

export default new UserService();
