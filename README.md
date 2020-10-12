# Introduction
#### 專案名稱 
Restaurant list Update
#### 專案簡介
本專案使用node.js和其下套件express.js開發餐廳選單網站，並且建立資料庫伺服器，讓資料能在網頁伺服器與資料庫之間串聯

___

# Install
#### 專案安裝
1. 使用命令提示字元將專案載入本機
```
git clone https://github.com/ckuoping/restaurants_list_update.git
```
2. 進入此專案路徑
```
cd "restaurant_list_update"
```
3. 安裝套件
```
npm install
```
4. 執行專案
```
npm run dev
```
___

# Features
#### 軟體功能
+ 首頁可以瀏覽所有餐廳與他們的資料
  - 餐廳照片
  - 餐廳名稱
  - 餐廳分類
  - 餐廳評分

+ 首頁可以新增餐廳
  - 新增餐廳名稱
  - 新增餐廳聯絡資訊
  - 新增餐廳評論
  - 新增餐廳圖片

+ 點擊照片檢閱餐廳詳細資訊
  - 餐廳類別
  - 餐廳地址
  - 餐廳電話
  - 餐廳介紹
  - 餐廳照片

+ 每一間餐廳可以進行編輯
  - 編輯餐廳資訊
  - 刪除餐廳

+ 根據關鍵字搜尋符合的餐廳
  - 若有超過一筆以上的結果，則顯示
  - 若無結果，則提示使用者無符合的餐廳




# Environment
#### 環境建置
+ Node.js v12.18.0
+ Express v4.17.1
+ Express Handlebars v5.1.0
+ Nodemon v2.0.4
+ Mongoose v5.10.7