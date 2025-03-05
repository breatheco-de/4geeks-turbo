import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { hc } from "hono/client";
import { cors } from "hono/cors";
// import type { FC } from "hono/jsx";
// import { HtmlEscapedString } from "react";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const PORT = process.env.PORT || process.env.API_PORT || 4000;

const app = new Hono();
let autoId = 0;

const schemas = {
  ws: z.object({
    name: z.string(),
    age: z.number(),
  }),
  stuff: z.object({
    id: z.number().optional(),
    name: z.string(),
  }),
};

type StuffItem = {
  id?: number;
  name: string;
};

let stuff: StuffItem[] = [];

// type LayoutProps = {
//   children: any;
// };

// const Layout: FC<LayoutProps> = ({ children }) => {
//   return (
//     <html>
//       <body>{children}</body>
//     </html>
//   );
// };

// const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
//   return (
//     <html>
//       <body>
//         <div style={{ textAlign: "center", padding: "20px" }}>
//           <h1
//             style={{
//               color: "#4A90E2",
//               fontSize: "2.5em",
//               marginBottom: "20px",
//             }}
//           >
//             Hello Hono!
//           </h1>
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             {props.messages.map((message, index) => {
//               return (
//                 <li
//                   key={index}
//                   style={{
//                     background: "#f0f0f0",
//                     margin: "10px auto",
//                     padding: "10px",
//                     borderRadius: "5px",
//                     width: "200px",
//                   }}
//                 >
//                   {message}!!
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </body>
//     </html>
//   );
// };

const route = app
  .use("*", cors())
  // .get("/", (c) => {
  //   return c.html(<Top messages={["Hello", "World"]} />);
  // })
  .get("/", (c) => {
    return c.html(
      <>
        <h1>Simple example</h1>
        <p>The original code was commented</p>
        <p>
          <a href="http://localhost:3000/">Get back</a>
        </p>
      </>
    );
  })

  .get(
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
  )

  .get("/stuff", (c) => {
    return c.json(stuff);
  })

  .post("/stuff", zValidator("json", schemas.stuff), async (c) => {
    const body: StuffItem = await c.req.json();
    const id = autoId++;
    body.id = id;
    stuff.push(body);
    return c.json({ message: "Stuff added successfully", data: body });
  })

  .put(
    "/stuff/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().transform((val) => parseInt(val, 10)),
      })
    ),
    zValidator("json", schemas.stuff),
    async (c) => {
      const id = parseInt(c.req.param("id"), 10);
      const body: StuffItem = await c.req.json();
      const x = stuff.find((item) => item.id === id);
      if (x) {
        x.name = body.name;
      }
      return c.json({ message: "Stuff updated successfully", data: body });
    }
  )

  .delete(
    "/stuff/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().transform((val) => parseInt(val, 10)),
      })
    ),
    (c) => {
      const id = parseInt(c.req.param("id"), 10);
      stuff = stuff.filter((item) => item.id !== id);
      return c.json({ message: "Stuff deleted successfully" });
    }
  );

export default {
  port: PORT,
  fetch: app.fetch,
  websocket,
};

export type AppType = typeof route;

const client = hc<typeof route>("http://localhost:4000");
(async () => {
  const x = await client.stuff[":id"].$delete({
    param: {
      id: "1",
    },
  });
  console.log(x);
  const y = await x.json();

  console.log(y);
})();

// // const client = hc<typeof app>('') as Client<typeof app>;
// // export type Client = typeof client;
// console.log(client);
// console.log(client.stuff.$get());

// // export const hcWithType = (
// //   ...args: Parameters<typeof hc>
// // ): Client<typeof app> => hc<typeof app>(...args);
