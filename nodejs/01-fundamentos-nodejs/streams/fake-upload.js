import { Readable } from 'node:stream'
// import { fetch } from 'undici'

class umAteCemStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i + '\n'))
        this.push(buf)
      }
    }, 1000)

  }
}

fetch('http://localhost:5501', {
  method: 'POST',
  body: new umAteCemStream(),
  duplex: 'half'
}).then(res => {
  return res.text()
}).then(data => {
  console.log(data)
})