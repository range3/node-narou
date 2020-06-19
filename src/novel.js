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
    const result = await naroujs({ ncode: this.ncode })
    this.metadata = result.items?.shift()
    if (this.metadata.novel_type === 1) {
      const res = await fetch(`https://ncode.syosetu.com/${this.ncode}/`)
      this.toc = TableOfContents.scrape(await res.text())
    }
  }

  get episodeLength () {
    return this.metadata.general_all_no || 0
  }

  async episode (no) {
    const episode = new Episode(this.ncode, no)
    await episode.fetch()
    return episode
  }
}

module.exports = Novel
