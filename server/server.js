
const express = require("express")

const app = express()
const http = require ("http")

const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors())
const server = http.createServer(Server)

const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("room", (data)=> {
        socket.join(data)
        console.log("Room Created ")
    })
})

server.listen(3000, () => {
    console.log('Chat server sarted at port 3000')
})