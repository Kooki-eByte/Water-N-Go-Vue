import cors from "cors";
import debug from "debug";
import express from "express";
import * as expressWinston from "express-winston";
import * as http from "http";
import * as winston from "winston";
import { CommonRoutesConfig } from "./common/routes.config";
import { UserRoutes } from "./routes/users/users.routes.config";

// returns an object of Application which we will be tossing around in the app
const app: express.Application = express();

// to start the server
const server: http.Server = http.createServer(app);
const port: number = 3005;

// Keep track of route files for debugging purposes
const routes: Array<CommonRoutesConfig> = [];

// A function for us to debug
const debugLogger: debug.IDebugger = debug("app");

// middleware to parse all incoming requests as JSON
app.use(express.json());

// middleware to allow cross-origin requests
app.use(cors());

// set up for expressWinston logging middleware configuration
// this will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

// When not debugging log requests as one-liners
if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

// initialize the logger with the above config from winston
app.use(expressWinston.logger(loggerOptions));

// adding routes to array
routes.push(new UserRoutes(app));

// Simple route to make sure everything is running smoothly
const serverStarted: string = `Server is running at http://localhost:${port}`;
app.get("/", (_: express.Request, res: express.Response) => {
  res.status(200).send("Hello there");
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLogger(`Routes configured for ${route.getName()}`);
  });

  console.log(serverStarted);
});
