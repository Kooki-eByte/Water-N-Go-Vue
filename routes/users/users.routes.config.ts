import express from "express";
import { CommonRoutesConfig } from "../../common/routes.config";
import UsersController from "../../controllers/users.controller";
import UsersMiddleware from "../../middlewares/users.middleware";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    // this super allows us to keep our code DRY
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    // /users
    this.app
      .route("/users")
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateEmailAlreadyExist,
        UsersController.createUser
      );

    // /users/:userId
    this.app.param("userId", UsersMiddleware.extractUserId);

    this.app
      .route("/users/:userId")
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.post("/users/:userId", [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateEmailMatchesUser,
      UsersController.updateUser,
    ]);

    return this.app;
  }
}
