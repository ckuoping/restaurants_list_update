const express = require('express')
const app = express()
const port = 3000


// 紀錄當前資料的數量
let lastId = 8

// 取得餐廳所有資料
const restaurant = require('./models/restaurant')

// 載入body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入資料庫相關設定
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', function() {
    console.log(`mongodb error`)
})
db.once('open', function() {
    console.log(`mongodb connected`)
})


// 設定HTML樣板並啟動之
app.use(express.static('public'))
const exhbs = require('express-handlebars')
app.engine('hbs', exhbs({ efaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 1.設定路由：首頁瀏覽所有資料
app.get('/', function(req, res) {
    restaurant.find()
        .lean()
        .then(function(restaurants) {
            res.render('index', { restaurants: restaurants })
            console.log(restaurants)
            console.log("==============")
            console.log(restaurants.length)
        })
        .catch(error => console.log(error))

})

// 2. 設定路由： 新增餐廳
app.get('/restaurants/new', function(req, res) {
    return res.render('new')
})

// 3. 設定路由：送出餐廳新增資料進行處理

app.post('/restaurants', function(req, res) {
    // 每新增一筆資料，就直接增加ID號碼
    restaurant.find()
        .lean()
        .then(function(restaurants) {
            lastId = restaurants[restaurants.length - 1].id + 1
            const id = lastId
            const name = req.body.name
            const name_en = req.body.name_en
            const category = req.body.category
            const image = req.body.image
            const location = req.body.location
            const phone = req.body.phone
            const google_map = req.body.google_map
            const rating = Number(req.body.rating)
            const description = req.body.description
            return restaurant.create({
                    id,
                    name,
                    name_en,
                    category,
                    image,
                    location,
                    phone,
                    google_map,
                    rating,
                    description
                })
                .then(function() { res.redirect('/') })
                .catch(error => console.log(error))
        })

})


/*
app.post('/restaurants', function(req, res) {

    // 每新增一筆資料，就直接增加ID號碼
    lastId = lastId + 1
    const id = lastId
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const rating = Number(req.body.rating)
    const description = req.body.description
    return restaurant.create({
            id,
            name,
            name_en,
            category,
            image,
            location,
            phone,
            google_map,
            rating,
            description
        })
        .then(function() { res.redirect('/') })
        .catch(error => console.log(error))
})
*/

// 4.設定路由：每一家餐廳的獨立頁面
app.get('/restaurants/:id', function(req, res) {
    const restaurant_id = req.params.id
    return restaurant.findOne({ id: restaurant_id })
        .lean()
        .then(function(store) {
            res.render('detail', { store: store })
        })
        .catch(error => console.log(error))
})

// 5.設定路由：刪除餐廳的資料
app.post('/restaurants/:id/delete', function(req, res) {
    const restaurant_id = req.params.id
    console.log('id got removed', restaurant_id)
    return restaurant.findOne({ id: restaurant_id })
        .then(function(store) {
            store.remove()
        })
        .then(function() {
            return res.redirect('/')
        })
        .catch(error => console.log(error))
})

// 6.設定路由：瀏覽編輯的頁面
app.get('/restaurants/:id/edit', function(req, res) {
    const restaurant_id = req.params.id
    return restaurant.findOne({ id: restaurant_id })
        .lean()
        .then(function(store) {
            res.render('edit', { store: store })
        })
        .catch(error => console.log(error))

})

// 7.設定路由：處理資料更新的頁面
app.post('/restaurants/:id/edit', function(req, res) {
    const restaurant_id = req.params.id

    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const location = req.body.location
    const google_map = req.body.google_map
    const phone = req.body.phone
    const rating = Number(req.body.rating)
    const description = req.body.description
    const image = req.body.image

    return restaurant.findOne({ id: restaurant_id })
        .then(function(store) {
            store.name = name
            store.name_en = name_en
            store.category = category
            store.location = location
            store.google_map = google_map
            store.phone = phone
            store.rating = rating
            store.description = description
            store.image = image

            return store.save()
                // console.log("result", result)
                // console.log("store", store)
        })
        .then(
            function() {
                return res.redirect(`/restaurants/${restaurant_id}`)
            }
        )
        .catch(error => console.log(error))



})


// 8.設定路由：搜尋的頁面
app.get('/search', function(req, res) {
    restaurant.find()
        .lean()
        .then(function(stores) {

            const storeSearch = stores.filter(function(store) {
                return store.name.toLowerCase().includes(req.query.keyword.toLowerCase())
            })
            res.render('index', { restaurants: storeSearch, keywords: req.query.keyword })
                // console.log(restaurants)
        })
        .catch(error => console.log(error))

})

app.listen(port, function() {
    console.log(`Express is running on http://localhost:${port}`)
})