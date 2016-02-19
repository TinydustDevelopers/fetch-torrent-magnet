const torrent = require('torrent-project-api')
const express = require('express')
const app = express()

app.get('/magnet', (req, res) => {
  const keyword = req.query.q

  if (!keyword) {
    return res.send({
      type: 'Error',
      data: [{
        code: 103,
        message: 'need keyword'
      }]
    })
  }

  const options = {
    limit: 1,
    order: 'best'
  }

  torrent.search(keyword, options, (err, result) => {
    if (err) {
      return res.send({
        type: 'Error',
        data: [{
          code: 102,
          message: err.toString()
        }]
      })
    }

    torrent.magnet(result.torrents[0], (err, link) => {
      if (err) {
        return res.send({
          type: 'Error',
          data: [{
            code: 102,
            message: err.toString()
          }]
        })
      }

      return res.send(200, {
        type: 'Text',
        data: [link]
      })
    })
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000!')
})
