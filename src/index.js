import { server } from './server.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
// eslint-disable-next-line no-undef
const port = process.env.PORT;

server.listen(port, () => {
	// eslint-disable-next-line no-undef
	console.log(`Server running on Port ${port}`);
});
