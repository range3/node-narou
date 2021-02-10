const Novel = require('./novel')
const naroujs = require('naroujs')

class Narou {
  novel (ncode) {
    return new Novel(ncode)
  }

  async getNovels (ncodes) {
    if (!ncodes?.length) {
      return []
    }

    const novels = []
    for (const slicedNcodes of this.sliceNcodes(ncodes)) {
      const res = await naroujs({ ncode: slicedNcodes.join('-'), lim: 100 })
      novels.push(...slicedNcodes.map(ncode => {
        return new Novel(ncode, res.items?.find(item => item?.ncode.toUpperCase() === ncode.toUpperCase()))
      }))
    }
    return novels
  }

  sliceNcodes (ncodes) {
    const maxSize = 100
    return new Array(Math.ceil(ncodes.length / maxSize))
      .fill()
      .map((_, i) => ncodes.slice(i * maxSize, (i + 1) * maxSize))
  }
}

module.exports = Narou
