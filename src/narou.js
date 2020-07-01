const Novel = require('./novel')

class Narou {
  novel (ncode) {
    return new Novel(ncode)
  }
}

module.exports = Narou
