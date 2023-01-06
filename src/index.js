import { server } from './server.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const port = process.env.PORT

server.listen(port, () => {
    console.log(`Server running on Port ${port}`)
  });
