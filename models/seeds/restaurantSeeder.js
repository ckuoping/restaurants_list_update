const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const store_list = require('../../restaurant.json')

// console.log(store_list.results.length)
// const keys = Object.keys(store_list.results[0])



mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', function() {
    console.log(`mongodb error`)
})

// 若連線成功，則增加資料
db.once('open', function() {
    console.log('mongodb connected!')


    // 建立資料
    for (let i = 0; i < store_list.results.length; i++) {
        restaurant.create({
            id: store_list.results[i].id,
            name: store_list.results[i].name,
            name_en: store_list.results[i].name_en,
            category: store_list.results[i].category,
            image: store_list.results[i].image,
            location: store_list.results[i].location,
            phone: store_list.results[i].phone,
            google_map: store_list.results[i].google_map,
            rating: store_list.results[i].rating,
            description: store_list.results[i].description
        })
    }


    console.log('done')


})