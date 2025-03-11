import stuffApp from "./server/stuff";
import notifyApp from "./server/notify";
import { hc } from "hono/client";

export function stuff(baseUrl: string) {
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return hc<typeof stuffApp>(`${baseUrl}/4geeks/v1/stuff`);
}

export function notify(baseUrl: string) {
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return hc<typeof notifyApp>(`${baseUrl}/4geeks/v1/notify`);
}
