import React, { useContext, useEffect } from 'react'
import './JoinRoom.css'
import io from 'socket.io-client'
import { GlobalContext } from '../../context/Provider'
import Background from '../Background/Background'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { nanoid } from 'nanoid'

const socket = io("http://localhost:5000")

export default function JoinRoom() {
  const { roomID, setRoomID, userID, setUserID } = useContext(GlobalContext)
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const handleJoinRoom = () => {
    if (userID.length && roomID.length) {
      socket.emit('join', { room: roomID, userName: userID })
      navigate("/game-room")
    }
  }

  const handleCloseJoin = () => {
    searchParams.delete("userName")
    searchParams.delete("roomName")
    navigate("/")
  }

  const handleRoomNameChange = (e) => {
    setRoomID(e.target.value)
    setSearchParams({ ...Object.fromEntries([...searchParams]), roomName: e.target.value })
  }

  useEffect(() => {
    let newUserId = nanoid(4)
    setUserID(newUserId)
    setSearchParams({ userName: newUserId })
    console.log("room", newUserId)
  }, [])

  return (
    <div>
      <Background />
      <div className="tambola">
        <span>T</span>
        <span>a</span>
        <span>m</span>
        <span>b</span>
        <span>o</span>
        <span>l</span>
        <span>a</span>
      </div>
      <div className="create-room-component">
        <h3>Join Room</h3>
        <label htmlFor="roomName">Room Name</label>
        <input type="text" id="roomName" value={roomID} onChange={handleRoomNameChange} />
        <div style={{ display: "flex", gap: "30px" }}>
          <button disabled={roomID.length === 0} onClick={handleJoinRoom}>Join</button>
          <button onClick={handleCloseJoin}>Close</button>
        </div>
      </div>
    </div>
  )
}
