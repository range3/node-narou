const { assert } = require('chai')
const fetch = require('node-fetch')
const TableOfContents = require('../src/table-of-contents')

describe('TableOfContents', () => {
  let baseUrl
  let ncode
  let tocText
  before(async () => {
    baseUrl = global.narou.baseUrl
    ncode = global.narou.ncodes[0]
    const res = await fetch(`${baseUrl}/${ncode}`)
    tocText = await res.text()
  })

  describe('scrape', () => {
    it('should return an instance of TableOfContents', () => {
      const toc = TableOfContents.scrape(tocText)
      assert.instanceOf(toc, TableOfContents)
    })
  })
})
