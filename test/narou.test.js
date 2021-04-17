const { assert } = require('chai')
const Narou = require('../src/narou')
const Novel = require('../src/novel')

describe('Narou', () => {
  let narou
  let ncode
  beforeEach(() => {
    narou = new Narou()
    ncode = global.narou.ncodes[0]
  })

  describe('novel', () => {
    it('should return a Novel class', async () => {
      assert.instanceOf(narou.novel(ncode), Novel)
    })
  })

  describe('getNovels', () => {
    it('should return an empty Array if ncodes arg is an empty array', async () => {
      const novels = await narou.getNovels([])
      assert.isArray(novels)
      assert.isEmpty(novels)
    })

    it('should return an array of Novels', async () => {
      const novels = await narou.getNovels(global.narou.ncodes)
      assert.isArray(novels)
      assert.lengthOf(novels, global.narou.ncodes.length)
      assert.instanceOf(novels[0], Novel)
      // assert.instanceOf(novels[1], Novel)
      assert.strictEqual(novels[0].metadata.title, '狼は眠らない')
    })
  })
})
