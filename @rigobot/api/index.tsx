import stuffApp from "./server/stuff";
import { hc } from "hono/client";

export function stuff(baseUrl: string) {
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return hc<typeof stuffApp>(`${baseUrl}/rigobot/v1/stuff`);
}
