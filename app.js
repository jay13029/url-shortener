const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

require('./config/mongoose')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//首頁
app.get('/', (req, res) => {
  res.render('index')
})

//網址送出
app.post('/', (req, res) => {
  const inputUrl = req.body.url
  // 產生短網址隨機碼
  const shortCode = getCode([])
  res.render('show', { shortCode })
})

//使用短網址
app.get('/:code', (req, res) => {
  const code = req.params.code
  //找原網址
  if(code === 'ABCDE') {
    res.redirect("http://www.google.com")
  } else {
    //查無資料導向錯誤頁面
    res.render('wrong')
  }
})


app.listen(port, () => {
  console.log(`This app is listening on http://localhost:${port}`)
})

//返回字串chars中的隨機字n次
function getRandomChar(chars, n) {
  let char = ''
  for (let i = 0; i < n; i++) {
    char += chars[Math.floor(Math.random() * chars.length)]
  }
  return char
}

function getCode(existCodes) {
  let chars = [];
  for(let i = 65; i <= 90; i++) {
    chars.push(String.fromCharCode(i)) //大寫字母
    chars.push(String.fromCharCode(i+32)) //小寫字母
  }
  for (let i = 0; i <= 9; i++) {
    chars.push(i.toString());
  }

  let code = getRandomChar(chars, 5)

  if (existCodes.includes(code)) {
    return getCode()
  } else {
    return code
  }
}
