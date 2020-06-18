import chai from 'chai'
import Narou from '../src/narou.mjs'
import Novel from '../src/novel.mjs'
import Episode from '../src/episode.mjs'

const { assert } = chai

describe('Narou', () => {
  const narou = new Narou()
  let novel
  before(async () => {
    novel = await narou.novel('n3930eh')
  })

  describe('novel', () => {
    it('should return a Novel class', async () => {
      assert.instanceOf(novel, Novel)
    })
  })

  describe('Novel', () => {
    let episode
    before(async () => {
      episode = await novel.episode(5)
    })

    describe('metadata', () => {
      it('should contain valid metadata', () => {
        console.log(novel.metadata)
      })
    })

    describe('episodeLength', () => {
      it('should be number', () => {
        assert.isNumber(novel.episodeLength)
      })
    })

    describe('episode', () => {
      it('should return Episode', async () => {
        assert.instanceOf(episode, Episode)
        console.log(episode)
      })
    })

    describe('Episode', () => {
    })
  })
})
