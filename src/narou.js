const Novel = require('./novel')
const naroujs = require('naroujs')

const MaxBulkGetSize = 100

class Narou {
  novel (ncode) {
    return new Novel(ncode)
  }

  async getNovels (ncodes, { interval } = { interval: 1000 }) {
    if (!ncodes?.length) {
      return []
    }

    const novels = []
    for (const slicedNcodes of this.sliceNcodes(ncodes)) {
      const res = await naroujs({ ncode: slicedNcodes.join('-'), lim: MaxBulkGetSize })
      novels.push(...slicedNcodes.map(ncode => {
        return new Novel(ncode, res.items?.find(item => item?.ncode.toUpperCase() === ncode.toUpperCase()))
      }))
      if (ncodes > MaxBulkGetSize) {
        await this._sleep(interval)
      }
    }
    return novels
  }

  sliceNcodes (ncodes) {
    return new Array(Math.ceil(ncodes.length / MaxBulkGetSize))
      .fill()
      .map((_, i) => ncodes.slice(i * MaxBulkGetSize, (i + 1) * MaxBulkGetSize))
  }

  _sleep (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms)
    })
  }
}

module.exports = Narou
