const fs = require('fs')
const path = require('path')
const { assert } = require('chai')
const nock = require('nock')
const Narou = require('../src/narou')

describe('Episode', () => {
  const baseUrl = 'https://ncode.syosetu.com'
  const ncode = 'n4136er'
  let scope

  before(() => {
    const mockEpisodePage = fs.readFileSync(
      path.join(__dirname, `./mock/${ncode}.1.html`))

    scope = nock(baseUrl).persist()
    scope
      .get(`/${ncode}/1/`)
      .reply(200, mockEpisodePage)
  })

  let episode
  beforeEach(() => {
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
      assert.propertyVal(episode, 'subtitle', 'プロローグ 異質なるもの')
      assert.propertyVal(episode, 'preface', '初投稿の小説ド素人では御座いますが、何卒暖かい目で読んでください。厳しい批評・暖かい感想を頂ければ幸いです。')
      assert.propertyVal(episode, 'afterword', 'プロローグだけはホラー風味ですが、以降は明るい感じで行きます！')
      assert.property(episode, 'content')

      const lines = episode.content.split('\n')
      console.log(require('util').inspect(lines, false, null, true))
      assert.strictEqual(lines[5], '　白銀のバケツ頭、若きエリート剣士 アルベルトは不服だった。')
    })

    it('should return itself', async () => {
      assert.strictEqual(await episode.fetch(), episode)
    })
  })
})
