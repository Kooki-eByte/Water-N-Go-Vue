import argon2 from "argon2";
import debug from "debug";
import express from "express";
import usersService from "../services/users.service";

const logger: debug.IDebugger = debug("app:users-controller");

class UserController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.getAll(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.getById(req.body.id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async updateUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    logger(await usersService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    logger(await usersService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new UserController();
