// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class umAteCemStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i+'\n'))
        this.push(buf)
      }
    }, 100)

  }
}

class vezesCemStream extends Writable {
  _write(chunk, encoding, cb) {
    console.log(Number(chunk.toString()) * 10)
    cb()
  }
}

class inversorStream extends Transform {
  _transform(chunk, encoding, cb) {
    const transformed = Number(chunk.toString()) * -1
    cb(null, Buffer.from(String(transformed)))
  }
}

new umAteCemStream()
  // .pipe(process.stdout)
  .pipe(new inversorStream())
  .pipe(new vezesCemStream())