const fs = require('fs')
const path = require('path')
const nock = require('nock')
const { assert } = require('chai')
const Narou = require('../src/index')

describe('Integration', () => {
  const baseUrl = 'https://ncode.syosetu.com'
  const ncode = 'n4136er'
  before(() => {
    nock(baseUrl).persist()
      .get(`/${ncode}/`)
      .reply(200, fs.readFileSync(path.join(__dirname, './mock/toc.html')))
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
