# 介紹
輸入網址，送出! 即可獲得短網址，點擊「Copy」將短網址複製到剪貼簿。

## 輸入內容
+ 不能為空白
+ 須為包含「http」或「https」的合理網址
+ 輸入相同內容時會獲得一樣的短網址

# 使用
1. 請先安裝 node.js 與 npm
2. 下載本專案
3. 於根目錄建立.env檔輸入「MONGODB_URI = "<於MongoDB獲取的連線網址>"」以使用資料庫
4. 開啟終端機進入本地資料夾
5. 於終端機輸入`npm install`以安裝所需套件
6. 安裝完成後輸入`npm run start`
7. 出現「This app is listening on http[]()://localhost:3000」表示成功
8. 於瀏覽器進入網址 `http://localhost:3000` 即可使用本專案

    **退出: 於終端機輸入「ctrl + c」**

## npm安裝套件
+ mongoose@5.13.15
+ express@4.18.2
+ express-handlebars@4.0.2
+ body-parser@1.20.2
+ dotenv@16.0.3

## 開發工具
+ Node.js 18.13.0
+ Bootstrap 5.3.0
