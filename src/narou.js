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
    const res = await naroujs({ ncode: ncodes.join('-') })

    return ncodes.map(ncode => {
      return new Novel(
        ncode,
        res.items?.find(
          item => item?.ncode.toUpperCase() === ncode.toUpperCase()))
    })
  }
}

module.exports = Narou
