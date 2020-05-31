import {
  listenAndServe,
  ServerRequest,
  acceptWebSocket,
  acceptable,
} from "../deps.ts";
import { chat } from "./chat.ts";

listenAndServe({ port: 3000 }, async (req: ServerRequest) => {
  const { method, url, conn, r: bufReader, w: bufWriter, headers } = req;

  if (method === "GET" && url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("index.html"),
    });
  }

  if (method === "GET" && url === "/ws") {
    // 检测 WebSocket 是否可用
    if (acceptable(req)) {
      // 将输入的 TCP 连接升级为 WebSocket 连接
      acceptWebSocket({
        conn,
        bufReader,
        bufWriter,
        headers,
      }).then(chat);
    }
  }
});

console.log("Server running on localhost:3000");
