const fetch = require('node-fetch')
const EpisodePage = require('./episode-page')

class Episode {
  constructor (ncode, no) {
    this.ncode = ncode
    this.no = no
  }

  get uri () {
    return `https://ncode.syosetu.com/${this.ncode}/${this.no}/`
  }

  async fetch () {
    const res = await fetch(this.uri)
    const episodePage = EpisodePage.scrape(await res.text())
    this.subtitle = episodePage.subtitle
    this.preface = episodePage.preface
    this.content = episodePage.content
    this.afterword = episodePage.afterword
    return this
  }
}

module.exports = Episode
