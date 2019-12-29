import fs from 'fs'
import { transpile } from 'typescript'

export function loadWorker(src: string): Promise<Worker> {
  return new Promise((resolve, reject) =>
    fs.readFile(src, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(
        new Worker(
          URL.createObjectURL(new Blob([transpile(data.toString())]))
        )
      )
    })
  )
}
