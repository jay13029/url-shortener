//返回字串chars中的隨機字n次
function getRandomChar(chars, n) {
  let char = ''
  for (let i = 0; i < n; i++) {
    char += chars[Math.floor(Math.random() * chars.length)]
  }
  return char
}

// 取得隨機碼(排除重複)
function getCode(existCodes) {
  let chars = [];
  for (let i = 65; i <= 90; i++) {
    chars.push(String.fromCharCode(i)) //大寫字母
    chars.push(String.fromCharCode(i + 32)) //小寫字母
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


module.exports = { getCode }