const { assert } = require('chai')
const Narou = require('../src/narou')

describe('Episode', () => {
  let baseUrl
  let ncode
  let episode
  beforeEach(() => {
    baseUrl = global.narou.baseUrl
    ncode = global.narou.ncodes[0]
    const narou = new Narou()
    episode = narou.novel(ncode).episode(1)
  })

  describe('uri', () => {
    it('should be a valid url', () => {
      assert.strictEqual(episode.uri, `${baseUrl}/${ncode}/1/`)
    })
  })

  describe('fetch', () => {
    it('should fetch valid contents', async () => {
      await episode.fetch()
      assert.propertyVal(episode, 'subtitle', '1_2')
      assert.propertyVal(episode, 'preface', '')
      assert.propertyVal(episode, 'afterword', '')
      assert.property(episode, 'content')

      const lines = episode.content.split('\n')
      assert.strictEqual(lines[0], '1')
    })

    it('should return itself', async () => {
      assert.strictEqual(await episode.fetch(), episode)
    })
  })
})
