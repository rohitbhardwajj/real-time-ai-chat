import React, { useState } from 'react'
import Spline from '@splinetool/react-spline';
import { IoIosSend } from "react-icons/io";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

const AiModel = () => {
  let [inputval, setInputVal] = useState("");
  let [chathistory, setChatHistory] = useState([]);

  socket.on("response-de", (data) => {
    let newchat = [...chathistory, { type: "ai", message: data }];
    setChatHistory(newchat);
    console.log("Received from server:", data);
  });


  let chathandeler = () => {
    if (!inputval.trim()) return; 
  
    let newchat = [...chathistory, { type: "user", message: inputval }];
    setChatHistory(newchat);
    setInputVal("");
    socket.emit("ai-message", inputval);
    console.log("Sent to server:", inputval);
  };

  return (
    <div className='ai-model'>
      <div className="robo">
        <Spline scene="https://prod.spline.design/hJ8BgRH6UbFi2wy4/scene.splinecode" />
      </div>
      <div className="chatoverlaydi">
        <div className="chathistory">
          {chathistory.map((chat, index) => (
            <div key={index} className={chat.type}>
              <p>{chat.message}</p>
            </div>
          ))}
        </div>
        <div className="inputField">
          <input
            onChange={(e) => setInputVal(e.target.value)}
            value={inputval}
            type="text"
            placeholder='Ask Your Question'
          />
          <button onClick={chathandeler} className='button'>
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AiModel
