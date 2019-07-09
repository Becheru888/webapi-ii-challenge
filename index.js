const express = require('express');

const server = express()

const Hub = require('./data/db')

server.use(express.json())


server.post('/api/posts', async (req, res) => {
    try {
        const newUser = req.body
        if(!req.body.title || !req.body.contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }else{res.status(201).json(newUser)}
    } catch(error){
        
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})










server.listen(3000, () => {
    console.log('Server running at port 3000')
})