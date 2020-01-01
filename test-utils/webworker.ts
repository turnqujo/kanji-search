// import { Worker } from 'worker_threads'

// export function loadWorker(workerFileName: string): Worker {
//   return new Worker(`${__dirname}/webworkerLoader.js`, {
//     workerData: {
//       path: `../src/webworkers/${workerFileName}`
//     }
//   })
// }

import Worker from 'tiny-worker'

export function loadWorker(workerFileName: string): Worker {
  // Worker.loadingWorker = `../src/webworkers/${workerFileName}`
  // (global as any).loadingWorker = `../src/webworkers/${workerFileName}`
  // return new Worker(`${__dirname}/webworkerLoader.js`, [], { esm: true })
  return new Worker(`src/webworkers/${workerFileName}`)
}
