const express=require('express')
const app=express()
// const {createServer}=require('node:http')
// const { join } = require('node:path')
// const { Server } = require('socket.io');

const port=5000

// const server=createServer(app)
// const io=new Server(server)

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'))
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
// })

app.listen(port,()=>{
    console.log(`App is running on port:${port}`)
})