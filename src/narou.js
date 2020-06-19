const Novel = require('./novel')

class Narou {
  async novel (ncode) {
    const novel = new Novel(ncode)
    await novel.fetch()
    return novel
  }
}

module.exports = Narou
