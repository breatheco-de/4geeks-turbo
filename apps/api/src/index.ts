import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { hc } from "hono/client";
const { upgradeWebSocket, websocket } = createBunWebSocket();

const PORT = process.env.PORT || process.env.API_PORT || 4000;

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
const schemas = {
  ws: z.object({
    name: z.string(),
    age: z.number(),
  }),
  stuff: z.object({
    key: z.string(),
    value: z.any(),
  }),
};

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    // let intervalId: NodeJS.Timer;
    return {
      // onOpen(_event, ws) {
      //   intervalId = setInterval(() => {
      //     ws.send(new Date().toString());
      //   }, 200);
      // },
      onMessage(event, ws) {
        console.log("onMessage", event);
        ws.send("pong");
      },
      // onClose() {
      //   clearInterval(intervalId);
      // },
    };
  })
);

type StuffItem = {
  [key: string]: any;
};

let stuff: StuffItem[] = [];

app.get("/stuff", (c) => {
  return c.json(stuff);
});

app.post("/stuff", zValidator("query", schemas.ws), async (c) => {
  const body: StuffItem = await c.req.json();
  stuff.push(body);
  return c.json({ message: "Stuff added successfully", data: body });
});

app.put("/stuff/:id", zValidator("json", schemas.ws), async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const body: StuffItem = await c.req.json();
  stuff[id] = body;
  return c.json({ message: "Stuff updated successfully", data: body });
});

app.delete("/stuff/:id", (c) => {
  const id = parseInt(c.req.param("id"), 10);
  stuff.splice(id, 1);
  return c.json({ message: "Stuff deleted successfully" });
});

export default {
  port: PORT,
  fetch: app.fetch,
  websocket,
};

export type AppType = typeof app;

// const client = hc<typeof app>("http://localhost:4000");

// const client = hc<typeof app>('') as Client<typeof app>;
// // export type Client = typeof client;
// console.log(client);
// console.log(client.stuff);
// (async () => {
//   console.log(await client.stuff.$get());
// })();
// client.stuff.$get();

// export const hcWithType = (...args: Parameters<typeof hc>): Client<typeof app> =>
//   hc<typeof app>(...args);
