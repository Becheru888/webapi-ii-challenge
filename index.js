const express = require('express');
const server = express()
const expressRouters = require('./expressRouters')

server.use(express.json())
server.use(expressRouters)








server.listen(3000, () => {
    console.log('Server running at port 3000')
})