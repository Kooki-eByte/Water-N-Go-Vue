import express from "express";

// This will be the common inheritance from all routes:
// All routes will have a name and access to the express application object
export abstract class CommonRoutesConfig {
  public app: express.Application;

  // name is used strictly for debugging purposes
  public name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  public getName() {
    return this.name;
  }

  abstract configureRoutes(): express.Application;
}
