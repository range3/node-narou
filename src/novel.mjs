import fetch from 'node-fetch'
import Episode from './episode.mjs'
import naroujs from 'naroujs'
import TableOfContents from './table-of-contents.mjs'

export default class Novel {
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
