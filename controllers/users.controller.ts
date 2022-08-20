import argon2 from "argon2";
import debug from "debug";
import express from "express";
import UsersService from "../services/users.service";

const logger: debug.IDebugger = debug("app:users-controller");

class UserController {
  // GET all
  async listUsers(req: express.Request, res: express.Response) {
    const users = await UsersService.getAll(100, 0);
    res.status(200).send(users);
  }

  // GET one by id
  async getUserById(req: express.Request, res: express.Response) {
    const user = await UsersService.getById(req.params.userId);
    res.status(200).send(user);
  }

  // POST user
  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await UsersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  // PUT user
  async updateUser(req: express.Request, res: express.Response) {
    // TODO: EXPRESS DOES NOT LIKE IT WHEN A REQ.BODY IS MODIFIED TO ITSELF
    req.body.password = await argon2.hash(req.body.password);
    logger(await UsersService.putById(req.params.userId, req.body));
    res.status(204).send();
  }

  // DELETE user
  async removeUser(req: express.Request, res: express.Response) {
    logger(await UsersService.deleteById(req.params.userId));
    res.status(204).send();
  }
}

export default new UserController();
