import express from "express";
import { CommonRoutesConfig } from "../../common/routes.config";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    // this super allows us to keep our code DRY
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    return this.app;
  }
}
