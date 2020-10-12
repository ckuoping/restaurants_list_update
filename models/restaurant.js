// 載入mongoose：只要這份檔案有需要用到mongoose的方法，就要載入
const mongoose = require('mongoose')

// 使用mongoose提供的schema方法：設定資料型態
const Schema = mongoose.Schema

// 透過建構子設定資料型態
const restaurantScehma = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    google_map: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

//  輸出 todo.js Scehma的model
module.exports = mongoose.model('restaurant', restaurantScehma)