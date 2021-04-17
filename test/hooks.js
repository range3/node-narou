const fs = require('fs')
const path = require('path')
const nock = require('nock')

exports.mochaHooks = {
  beforeAll () {
    global.narou = {
      baseUrl: 'https://ncode.syosetu.com',
      ncodes: ['n3930eh'],
    }

    console.log('mocha Hooks!')
    global.scope = nock(global.narou.baseUrl).persist()
    global.narou.ncodes.forEach(ncode => {
      global.scope
        .get(new RegExp(`^/${ncode}/?$`))
        .reply(200, fs.readFileSync(path.join(__dirname, `./mock/${ncode}.toc.html`)))
        .get(new RegExp(`^/${ncode}/1/?$`))
        .reply(200, fs.readFileSync(path.join(__dirname, `./mock/${ncode}.1.html`)))
    })
  },
}
