const express = require('express');

const server = express()

const Hub = require('./data/db')

server.use(express.json())


server.get('/api/posts', async (req, res) =>{
    try {
        const hub = await Hub.find(req.query)
        res.status(200).json(hub)
    } catch(error){
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
})


server.post('/api/posts', async (req, res) => {
    try {
        const newUser = req.body
        if(!req.body.title || !req.body.contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }else{
            res.status(201).json(newUser)
           await Hub.insert(newUser)
        }
    } catch(error){
        
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

server.get('/api/posts/:id/comments', async (req, res) =>{
    
    try{
        const {id} = req.params
        if(id !== 0){
            const comments = await Hub.findPostComments(id)
            res.status(200).json(comments)
        }else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }

    }catch(error){
        res.status(500).json( { error: "The comments information could not be retrieved." })
    }
})


server.get('/api/post/:id', async(req, res) => {
    const {id} = req.params
    try{
        if(id !== 0){
            const post = await Hub.findById(id)
            res.status(200).json(post)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }catch(error){
        res.status(500).json({ error: "The post information could not be retrieved." })}
})

server.delete('/api/post/:id'), async(req, res)=> {
    const {id} = req.params
    try{
        if(id !== 0){
            const post = await Hub.findById(id)
            res.status(200).json(post)
            Hub.remove(post)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }catch(error){
        res.status(500).json({ error: "The post could not be removed" })}
}










server.listen(3000, () => {
    console.log('Server running at port 3000')
})