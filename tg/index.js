const express = require('express')
// const app = require('./app')
const keys = require('./keys/index')

const app = express()

const PORT = keys.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening on port${PORT}`)
})