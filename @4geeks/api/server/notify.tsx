import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

const route = app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log("onMessage", event);
        ws.send("pong");
      },
    };
  })
);

export default route;
export { websocket };
