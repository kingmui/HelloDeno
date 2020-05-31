import { WebSocket, isWebSocketCloseEvent, v4, camelCase } from "../deps.ts";
// import { camelize } from "../utils/index.ts";

const users = new Map<string, WebSocket>();

function broadcast(message: string, senderId?: string): void {
  if (!message) return;
  for (const user of users.values()) {
    user.send(senderId ? `[${senderId}]: ${message}` : message);
  }
}

export async function chat(ws: WebSocket): Promise<void> {
  console.log("socket connected!");

  const userId = v4.generate();

  users.set(userId, ws);
  broadcast(`> 用户 ${userId} 已连接`);

  try {
    // 等待新消息
    for await (const event of ws) {
      if (typeof event === "string") {
        broadcast(event, userId);
      } else if (isWebSocketCloseEvent(event)) {
        // 注销用户
        users.delete(userId);
        broadcast(`> 用户 ${userId} 已断连`);
        break;
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);
    if (!ws.isClosed) {
      await ws.close(1000).catch(console.error);
    }
  }
}
