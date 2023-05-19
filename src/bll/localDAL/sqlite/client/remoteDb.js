import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread';
import createActionsBackend from '@code/tools/worker-actions/client';
import RemoteDbWorker from '../backend/index.worker.js?worker';
// це спеціальний запис в vite. 
// він бачить "?worker", розуміє, що це воркер і генерує код створення воркера
// як все насправді - https://developer.mozilla.org/en-US/docs/Web/API/Worker

const worker = new RemoteDbWorker();
const backend = createActionsBackend({ worker });
initBackend(worker);

/*
const originRequest = backend.request;
backend.request = async (...args) => {
	let res = await originRequest(...args);
	console.log(`${args[0]}: `, res);
	return res;
}
*/

export default backend;