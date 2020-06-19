const { assert } = require('chai')
const fetch = require('node-fetch')
const TableOfContents = require('../src/table-of-contents')

describe('TableOfContents', () => {
  let tocText
  before(async () => {
    const res = await fetch('https://ncode.syosetu.com/n2199ex/')
    tocText = await res.text()
  })

  describe('scrape', () => {
    it('should return TableOfContents', () => {
      const toc = TableOfContents.scrape(tocText)
      assert.instanceOf(toc, TableOfContents)
      console.log(toc)
    })
  })
})
