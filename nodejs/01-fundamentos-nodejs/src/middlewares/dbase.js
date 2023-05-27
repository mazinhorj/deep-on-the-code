import fs from 'fs/promises'

const databasePath = new URL('../../myDb.json', import.meta.url)

export class Database {
  #database = {

  }

  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(tab) {
    const data = this.#database[tab] ?? []
    return data
  }

  insert(tab, data) {
    if (Array.isArray(this.#database[tab])) {
      this.#database[tab].push(data)
    } else {
      this.#database[tab] = [data]
    }
    this.#persist()
    return data
  }
} 