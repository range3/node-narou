import Novel from './novel.mjs'

export default class Narou {
  async novel (ncode) {
    const novel = new Novel(ncode)
    await novel.fetch()
    return novel
  }
}
