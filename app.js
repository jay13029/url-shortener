const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const Record = require('./models/record')
const funcs = require('./config/functions')

const app = express()
const port = 3000

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//首頁
app.get('/', (req, res) => {
  res.render('index')
})

//網址送出
app.post('/', (req, res) => {
  const originUrl = req.body.url
  // 取得已存code
  let exitsCodes = []
  return Record.find({},
    (err, records) => {
      if (err) {
        console.log(err);
      } else {
        records.forEach(record => {
          exitsCodes.push(record.shortCode);
        });
      }
    })
    .then(() => {
      const shortCode = funcs.getCode(exitsCodes)
      const shortUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}/${shortCode}`
      Record.create({ originUrl, shortCode })
      res.render('show', { shortUrl })
    })
    .catch(error => console.log(error))
})

//使用短網址
app.get('/:code', (req, res) => {
  const code = req.params.code
  //找原網址
  if (code === 'ABCDE') {
    res.redirect("http://www.google.com")
  } else {
    //查無資料導向錯誤頁面
    res.render('wrong')
  }
})


app.listen(port, () => {
  console.log(`This app is listening on http://localhost:${port}`)
})
