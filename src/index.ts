import 'dotenv/config';
import { server } from './server';

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
