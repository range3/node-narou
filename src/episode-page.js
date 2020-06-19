const cheerio = require('cheerio')

class EpisodePage {
  static scrape (html) {
    const $ = cheerio.load(html)
    const $novelContents = $('#novel_contents')

    const subtitle = $novelContents.find('.novel_subtitle').text().trim()
    const preface = $novelContents.find('#novel_p').text().trim()
    const content = $novelContents.find('#novel_honbun').text().trim()
    const afterword = $novelContents.find('#novel_a').text().trim()

    return {
      subtitle,
      preface,
      content,
      afterword,
    }
  }
}

module.exports = EpisodePage
