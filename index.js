const express = require('express');

const server = express()

server.use(express.json())






server.listen(4000, () => {
    console.log('Server running at port 4000')
})