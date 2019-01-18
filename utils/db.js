const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const mongo = {
  name: process.env.ANDAGA_DB_NAME,
  collection: process.env.ANDAGA_DB_COLLECTION,
  url: process.env.ANDAGA_DB_URL
}

const storeSummary = log => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, { useNewUrlParser: true })

    client.connect((err) => {
      assert.strictEqual(null, err)
      console.info('Connected successfully to server to store log')
      const db = client.db(mongo.name)

      insertDocument(db, mongo.collection, log)
        .then(result => {
          client.close()
          console.info('Log storred successfully')
          resolve(result)
        })
        .catch(err => {
          client.close()
          reject(err)
        })
    })
  })
}
const insertDocument = (db, collectionName, log) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    collection.insertOne(log)
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = { storeSummary }
