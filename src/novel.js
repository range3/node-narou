const fetch = require('node-fetch')
const naroujs = require('naroujs')
const Episode = require('./episode')
const TableOfContents = require('./table-of-contents')

class Novel {
  constructor (ncode) {
    this.ncode = ncode
    this.metadata = null
  }

  async fetch () {
    await this.fetchMetadata()
    if (this.metadata.novel_type === 1) {
      await this.fetchToc()
    }
  }

  async fetchMetadata () {
    const result = await naroujs({ ncode: this.ncode })
    this.metadata = result.items?.shift()
  }

  async fetchToc () {
    const res = await fetch(`https://ncode.syosetu.com/${this.ncode}/`)
    this.toc = TableOfContents.scrape(await res.text())
  }

  get episodeLength () {
    return this.metadata.general_all_no || 0
  }

  episode (no) {
    return new Episode(this.ncode, no)
  }
}

module.exports = Novel
