import path from "path";
import express from "express";

// configs
import "./config/env.config";
import "./config/discord-bot.config";
import session from "./config/session.config";
import grant from "./config/grant.config";
import { connect, DI } from "./config/database.config";

// routes
import auth from "./routes/auth";

import { RequestContext } from "@mikro-orm/core";

const pkg = require("../package.json");

const port = Number(process.env.PORT || 2567);
const app = express()

// use static dir for production
const STATIC_DIR = path.resolve(__dirname, "..", "public");
app.use(express.static(STATIC_DIR));

// middlewares
app.use(express.json())
app.use(session);
app.use(grant);

//
// MikroORM: it is important to create a RequestContext before registering routes that access the database.
// See => https://mikro-orm.io/docs/identity-map/
//
app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

// Register your express routes
app.use("/auth", auth);

connect().then(() => {
  console.log("Database connected.");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on ws://localhost:${port}`)
    console.log(`Application v${pkg.version} ready.`);
  });
});