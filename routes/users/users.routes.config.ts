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

    // .all will validate all requests from /users/:userId to make sure they are authorized
    this.app
      .route("/users/:userId")
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    // seperated due to middleware requirements
    this.app.put(`/users/:userId`, [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateEmailMatchesUser,
      UsersController.updateUser,
    ]);

    return this.app;
  }
}
