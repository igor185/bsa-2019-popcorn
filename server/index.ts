import * as dotenv from "dotenv";
dotenv.config();

const path = require("path");
const fs = require("fs");
const passport = require("passport");
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./controllers/root.controller";
import authorizationMiddleware from "./middlewares/authorization.middleware";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import notificationMiddleware from "./middlewares/notification.middleware";
import routesWhiteList from "./config/routes-white-list.config";
import { createConnection } from "typeorm";
import db_config from "./config/orm.config";
import "reflect-metadata";

import socketInjector from "./socket/inject";
import socketHandlers from "./socket/handlers";

const cors = require("cors");
const http = require("http");

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const SERVER_PORT = process.env.PORT || 5000;
createConnection(db_config)
  .then(connection => connection.runMigrations())
  .then(() => {
    const io = require("socket.io")(
      http.createServer(app).listen(SERVER_PORT, () => {
        console.log(`Server is running on http://localhost:${SERVER_PORT}`);
      })
    );

    io.on("connection", socketHandlers);

    app.use(socketInjector(io));

    app.use("/api/", authorizationMiddleware(routesWhiteList));
    app.use(notificationMiddleware);
    routes(app);
    app.use(errorHandlerMiddleware);

    if (process.env.NODE_ENV === "production") {
      const staticPath = path.resolve(`${__dirname}/../client/build`);
      app.use(express.static(staticPath));
      app.get("*", (req, res) => {
        res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
        res.end();
      });
    }
  })
  .catch(e => console.log(e.message));
