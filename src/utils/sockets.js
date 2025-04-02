import io from "socket.io-client";
import { ENV } from "./constanst";

export let socket = null;

export function initSockets() {
  socket = io(ENV.SOCKET_URL);
}
