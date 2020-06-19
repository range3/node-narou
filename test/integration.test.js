const Narou = require('../src/index')

describe('Integration', () => {
  it('test', async () => {
    const narou = new Narou()
    const novel = await narou.novel('n2199ex')
    console.log(novel.episodeLength)
    const episode = await novel.episode(1)
    console.log(episode.subtitle)
    console.log(episode.preface)
    console.log(episode.content)
    console.log(episode.afterword)
  })
})
