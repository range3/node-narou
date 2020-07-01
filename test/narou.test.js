const { assert } = require('chai')
const Narou = require('../src/narou')
const Novel = require('../src/novel')

describe('Narou', () => {
  let narou
  beforeEach(() => {
    narou = new Narou()
  })

  describe('novel', () => {
    it('should return a Novel class', async () => {
      assert.instanceOf(narou.novel('n5519gi'), Novel)
    })
  })
})
