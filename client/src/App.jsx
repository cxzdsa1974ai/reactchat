import React, { useEffect, useState } from 'react'

import io from "socket.io-client"

const socket = io.connect("http://localhost:3000")

const App = () => {

  const [msg, setMsg] = useState("")
  const [room, setRoom] = useState("")
  const [serverMsg, setServerMsg] = useState("")


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setServerMsg(data)
    })
  }, [socket])

  const sendMessage = () => {
    socket.emit("send_message", {
      message: msg,
      room: room
    })
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("room", room)
    }
  }

  return (
    <>
      <input type="text" placeholder='Room Code' 
        name="room"
        onChange={(e) => setRoom(e.target.value)} />

      <button onClick={joinRoom}>Join Room</button>

      <input type="text" placeholder='message' 
        name="message"
        onChange={(e) => setMsg(e.target.value)} />
      
      <button onClick={sendMessage}>Send Message</button>


    <div>
      {
        (serverMsg) ? serverMsg.message : ''
      }
    </div>
      </>
  )
}

export default App