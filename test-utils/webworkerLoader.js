// See here: https://wanago.io/2019/05/06/node-js-typescript-12-worker-threads/
const path = require('path');
// const { workerData } = require('worker_threads');

console.log(global)
require('ts-node').register();
// require(path.resolve(__dirname, workerData.path));
require(path.resolve(__dirname, global.loadingWorker));

