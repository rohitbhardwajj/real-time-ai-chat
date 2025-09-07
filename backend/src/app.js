const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const authroutes = require('./routes/Auth.route');
const generateResponse = require("./services/ai.service")
const app = express();

let chatHistory=[

]

app.use(cookieParser());   
app.use(express.json());

app.use('/api', authroutes);


const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",  // frontend ka URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

socket.on("ai-message", async (data)=> {
   chatHistory.push({role:"user", parts: [{text:data}]}); 

  const ans = await generateResponse(chatHistory); 

  chatHistory.push({role:"assistant", parts: [{text:ans}]});

  socket.emit("response-de", ans);

  console.log("Chat History:", chatHistory);  
});


});

module.exports = { app, httpServer };
