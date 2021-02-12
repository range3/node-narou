const { assert } = require('chai')
const Narou = require('../src/narou')
const Novel = require('../src/novel')

describe('Narou', () => {
  let narou
  const ncode = 'n4136er'
  beforeEach(() => {
    narou = new Narou()
  })

  describe('novel', () => {
    it('should return a Novel class', async () => {
      assert.instanceOf(narou.novel(ncode), Novel)
    })
  })

  describe('getNovels', () => {
    it('should return a empty Array if ncodes arg is a empty array', async () => {
      const novels = await narou.getNovels([])
      assert.isArray(novels)
      assert.isEmpty(novels)
    })

    it('should return an array of Novels', async () => {
      const novels = await narou.getNovels([ncode, 'n3930eh'])
      assert.isArray(novels)
      assert.lengthOf(novels, 2)
      assert.instanceOf(novels[0], Novel)
      assert.instanceOf(novels[1], Novel)
      assert.strictEqual(novels[0].metadata.title, '鎌倉武士は異世界へ  〜武士道とは鬼畜道と見つけたり〜')
    })
  })
})
