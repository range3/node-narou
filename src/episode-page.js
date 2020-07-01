const cheerio = require('cheerio')

class EpisodePage {
  static scrape (html) {
    const $ = cheerio.load(html)
    const $novelContents = $('#novel_contents')

    const subtitle = $novelContents.find('.novel_subtitle').text().trim()
    const preface = $novelContents.find('#novel_p p').text().trim()
    const content = $novelContents
      .find('#novel_honbun p')
      .map((i, el) => cheerio(el).text())
      .get()
      .join('\n')
    const afterword = $novelContents.find('#novel_a p').text().trim()

    return {
      subtitle,
      preface,
      content,
      afterword,
    }
  }
}

module.exports = EpisodePage
