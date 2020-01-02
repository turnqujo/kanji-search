import Worker from 'tiny-worker'

export function loadWorker(workerFileName: string): Worker {
  return new Worker(`src/webworkers/build/webworkers/${workerFileName}`)
}
