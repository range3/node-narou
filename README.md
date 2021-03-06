# @range3/narou
[![npm version](https://badge.fury.io/js/%40range3%2Fnarou.svg)](https://badge.fury.io/js/%40range3%2Fnarou)

> 小説家になろうNode.jsライブラリ

## Install
```bash
$ yarn add @range3/narou
```

## Usage
```js
const Narou = require('@range3/narou')

const narou = new Narou()
const novel = narou.novel('ncode')
await novel.fetch()

// 小説メタデータ(なろう小説API出力を参照)
// https://dev.syosetu.com/man/api/#link6
const novel.metadata 

// 目次
const toc = novel.toc.toArray()
// [
//     { type: 'chapter', title: 'チャプター１タイトル' },
//     {
//       type: 'episode',
//       path: '/ncodeXXXXXX/1/',
//       no: 1,
//       subtitle: '１話サブタイトル',
//       created: '2018/07/27 11:26',
//       updated: '2018/10/20 14:04'
//     },
//     {
//       type: 'episode',
//       path: '/ncodeXXXXX/2/',
//       no: 2,
//       subtitle: '2話サブタイトル',
//       created: '2018/07/27 19:02',
//       updated: '2018/09/29 06:14'
//     },
//     { type: 'chapter', title: 'チャプター2タイトル' },
//     ...
// ]

console.log(novel.episodeLength)
const episode = novel.episode(10)
await episode.fetch()
console.log(episode.subtitle)
console.log(episode.preface)
console.log(episode.content)
console.log(episode.afterword)

// Bulk-get
const novels = await narou.getNovels(['n5519gi', 'nxxxxx'])
```

## TODO
- 短編小説対応
