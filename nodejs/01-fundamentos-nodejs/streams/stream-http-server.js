import http from 'node:http'
import { Transform } from 'node:stream'

class inversorStream extends Transform {
  _transform(chunk, encoding, cb) {
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed)
    cb(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const todoConteudoDaStream = Buffer.concat(buffers).toString()

  console.log(todoConteudoDaStream)

  return res.end(todoConteudoDaStream)

  // return req
  //   .pipe(new inversorStream())
  //   .pipe(res)
})

server.listen(5501)