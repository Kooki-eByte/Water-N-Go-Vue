import debug from "debug";
import express from "express";
import UserService from "../services/users.service";

const logger: debug.IDebugger = debug("app:users-controller");
class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // check if the fields are in the body and if it is then hit the next function.
    if (Object.keys(req.body).length === 0)
      return res
        .status(400)
        .send({ error: "Missing required fields email and password" });
    if (!req.body.email)
      return res.status(400).send({ error: "Missing required field email" });
    if (!req.body.password)
      return res.status(400).send({ error: "Missing required field password" });

    next();
  }

  async validateEmailAlreadyExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UserService.getUserByEmail(req.body.email);
    if (user) return res.status(400).send({ error: "Email already in use!" });

    next();
  }

  async validateEmailMatchesUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UserService.getUserByEmail(req.body.email);
    if (user && user?._id === req.params.userId) next();
    res.status(400).send({ error: "Invalid email!" });
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UserService.getById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send({ error: `user with ${req.params.userId} not found!` });

    next();
  }

  // idea here is to be able to simply use the full body request when we would like to update user information,
  // without worrying about getting the ID from the parameters every time.
  // Instead, it’s taken care of in just one spot, the middleware.
  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.id;
    next();
  }
}

export default new UsersMiddleware();
