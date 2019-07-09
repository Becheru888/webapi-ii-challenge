const express = require('express');

const server = express()

const Hub = require('./data/db')

server.use(express.json())


server.get('/api/posts', async (req, res) => {
    try {
        const hub = await Hub.find(req.body);
        res.status(200).json(hub)
    } catch(error){
        console.log(error);
        res.status(500).json({message: 'Error getting the Hub'})
    }
})










server.listen(4000, () => {
    console.log('Server running at port 4000')
})