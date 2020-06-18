import chai from 'chai'
import fetch from 'node-fetch'
import TableOfContents from '../src/table-of-contents.mjs'

const { assert } = chai

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
