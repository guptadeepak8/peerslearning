import { createServer } from "http";
import { ListenOptions } from "net";
import next from "next";
import { Server, Socket } from "socket.io";



const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {



  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket:Socket<ListenOptions>) => {
    
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`,
      );
    });
});
// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url!, true);
//     handler(req, res, parsedUrl);
//   }).listen(port);

//   console.log(
//     `> Server listening at http://localhost:${port} as ${
//       dev ? "development" : process.env.NODE_ENV
//     }`,
//   );
// });