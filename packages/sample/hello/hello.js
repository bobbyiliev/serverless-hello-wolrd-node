const helloWorld = require('hello-world-npm')

function main(args) {

    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)

    console.log(helloWorld());

    return {"body": greeting}
  }
  
exports.main = main

