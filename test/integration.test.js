const { assert } = require('chai')
const Narou = require('../src/index')

describe('Integration', () => {
  let ncode
  before(() => {
    ncode = global.narou.ncodes[0]
  })

  it('test', async () => {
    const narou = new Narou()
    const novel = narou.novel(ncode)
    await novel.fetch()
    assert.isAtLeast(novel.episodeLength, 1)
    const episode = novel.episode(1)
    await episode.fetch()
    assert.containsAllKeys(episode, [
      'subtitle',
      'preface',
      'content',
      'afterword',
    ])
  })
})
