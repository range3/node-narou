import cheerio from 'cheerio'

export default class TableOfContents {
  static scrape (html) {
    const $ = cheerio.load(html)
    const $novelContents = $('#novel_contents')

    return new TableOfContents($novelContents.find('.chapter_title, .novel_sublist2')
      .toArray()
      .map(el => {
        const $cur = $(el)
        if ($cur.hasClass('chapter_title')) {
          return {
            type: 'chapter',
            title: $cur.text().trim(),
          }
        } else {
          const path = $cur.find('.subtitle a').attr('href')
          return {
            type: 'episode',
            path,
            no: parseInt(path.match(/\/[^/]+?\/(?<episodeNum>\d+)\//)?.groups.episodeNum, 10) || null,
            subtitle: $cur.find('.subtitle').text().trim(),
            ...TableOfContents.scrapeTimestamps($cur),
          }
        }
      }))
  }

  static scrapeTimestamps ($episode) {
    const $updated = $episode.find('.long_update span')
    const created = $episode.find('.long_update').contents().get(0).nodeValue.trim()
    const updated = $updated.length ? $updated.attr('title').match(/(.*?) 改稿/)[1].trim() : null
    return {
      created,
      updated,
    }
  }

  constructor (arr = []) {
    this.arr = arr
  }

  toArray () {
    return Array.from(this.arr)
  }
}
