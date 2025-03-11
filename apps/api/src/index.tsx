import { Hono } from "hono";
import { cors } from "hono/cors";
import stuff from "@4geeks/api/server/stuff";
import notify, { websocket } from "@4geeks/api/server/notify";
import rigobotStuff from "@rigobot/api/server/stuff";
const app = new Hono();

const route = app
  .use("*", cors())
  .route("/4geeks/v1/stuff", stuff)
  .route("/4geeks/v1/notify", notify)
  .route("/rigobot/v1/stuff", rigobotStuff);

export default {
  port: 4000,
  fetch: route.fetch,
  websocket,
};
