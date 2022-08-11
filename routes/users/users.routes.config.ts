import express from "express";
import { CommonRoutesConfig } from "../../common/routes.config";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    // this super allows us to keep our code DRY
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    // /users
    this.app
      .route("/users")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send("get all users");
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send("Post to users");
      });

    // /users/:userId
    this.app
      .route("/users/:userId")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // this middleware function runs before ANY request to /user/:userId
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET request for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT request for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE request for id ${req.params.userId}`);
      });

    return this.app;
  }
}
