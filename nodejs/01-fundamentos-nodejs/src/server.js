import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './middlewares/dbase.js'

const users = []
const database = new Database

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')
    console.log(users)
    return res.end(JSON.stringify(users))

  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res
      .writeHead(201)
      .end(JSON.stringify(users))

  }

  return res.writeHead(404).end('Tá perdido? Tem nada aqui não!')
})

server.listen(5500)