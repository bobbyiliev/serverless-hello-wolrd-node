const fs = require('fs');
const helloWorld = require('hello-world-npm')
const { Client } = require('pg');

async function main(args) {
  // Base64 decode the process.env.CA_CERT
  const caCert = Buffer.from(process.env.CA_CERT, 'base64').toString('utf8')
  // store the cert in a file
  fs.writeFileSync('ca.crt', caCert)

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      ca: caCert
    }
  });
  // Instantiates a connection to the database and retrieves data from the `available-coffee` collection
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM users');
    console.log(res.rows);
    return {"body": res.rows}
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }

}

exports.main = main