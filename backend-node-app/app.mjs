import 'dotenv/config';
import Server from './config/server.mjs';

const server = new Server();

server.listen();
