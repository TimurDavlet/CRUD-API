/* eslint-disable no-undef */
import os from 'os';
import cluster from 'cluster';
import { config as dotenvConfig } from 'dotenv';
import { server } from './server.js';

const pid = process.pid;

dotenvConfig();
let port = process.env.PORT;

if (cluster.isPrimary) {
	const cpusCount = os.cpus().length;
	console.log(`CPUs: ${cpusCount}`);
	console.log(`Master started. Pid: ${pid}`);
	for (let i = 0; i < cpusCount; i += 1) {
		// eslint-disable-next-line no-unused-vars
		const worker = cluster.fork(port + 1);
	}
}

if (cluster.isWorker) {
	server.listen(port, () =>
		console.log(`Worker ${cluster.worker.id} launched, port: ${port}`)
	);
}
