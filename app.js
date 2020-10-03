const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res) {
    res.send('This is an updated version of restaurant page.')
})

app.listen(port, function() {
    console.log(`Express is running on http://localhost:${port}`)
})