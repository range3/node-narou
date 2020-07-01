const fs = require('fs')
const path = require('path')
const { assert } = require('chai')
const nock = require('nock')
const Narou = require('../src/narou')

describe('Episode', () => {
  const baseUrl = 'https://ncode.syosetu.com'
  const ncode = 'n5519gi'
  let scope

  before(() => {
    const mockEpisodePage = fs.readFileSync(
      path.join(__dirname, './mock/n5519gi.1.html'))

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
      assert.propertyVal(episode, 'subtitle', 'サブタイトルテスト')
      assert.propertyVal(episode, 'preface', 'これは前書きです。')
      assert.propertyVal(episode, 'afterword', 'これは後書きです。')
      assert.property(episode, 'content')

      const lines = episode.content.split('\n')
      assert.strictEqual(lines[0], '　小説家になろうの小説を、ターミナルで閲覧する小説リーダーを作っています。これは、開発テスト用の小説です。')
    })

    it('should return itself', async () => {
      assert.strictEqual(await episode.fetch(), episode)
    })
  })
})
