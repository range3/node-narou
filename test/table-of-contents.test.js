const fs = require('fs')
const path = require('path')
const { assert } = require('chai')
const nock = require('nock')
const fetch = require('node-fetch')
const TableOfContents = require('../src/table-of-contents')

describe('TableOfContents', () => {
  const baseUrl = 'https://ncode.syosetu.com'
  const ncode = 'n5519gi'
  let tocText
  before(async () => {
    nock(baseUrl).persist()
      .get(new RegExp(`/${ncode}/?`))
      .reply(200, fs.readFileSync(path.join(__dirname, './mock/toc.html')))
    const res = await fetch(`${baseUrl}/${ncode}`)
    tocText = await res.text()
  })

  describe('scrape', () => {
    it('should return an instance of TableOfContents', () => {
      const toc = TableOfContents.scrape(tocText)
      assert.instanceOf(toc, TableOfContents)
      console.log(toc)
    })
  })
})
