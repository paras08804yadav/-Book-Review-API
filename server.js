const dotenv = require("dotenv");
const http = require("http");
const app = require("./app"); // Express app

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
