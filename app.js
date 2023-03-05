const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const Record = require('./models/record')
const funcs = require('./config/functions')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// 網址送出
app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect("/")
  const originUrl = req.body.url
  Record.findOne({originUrl})
    .then(record => {
      if(!record) { // 不存在，建立新的隨機碼
        return Record.find()
        .lean()
        .then(records => {
          let exitsCodes = [] //使用過的隨機碼
          records.forEach(record => {
            exitsCodes.push(record.shortCode)
          })
          // 獲取隨機碼
          shortCode = funcs.getCode(exitsCodes)
          Record.create({ originUrl, shortCode })
          return shortCode
        })
      } else { // 資料存在，返回原隨機碼
        return record.shortCode
      }
    })
    .then(shortCode => {
      const shortUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}/${shortCode}`
      res.render('show', { shortUrl })
    })
    .catch(err => console.log(err))
})

// 使用短網址
app.get('/:code', (req, res) => {
  const code = req.params.code
  // 找原網址
  Record.findOne({ shortCode: code })
    .then(record => {
      if(!record){ // 查無資料，導向錯誤頁面
        res.render('wrong')
      } else {
        res.redirect(record.originUrl)
      }
    })
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log(`This app is listening on http://localhost:${port}`)
})
