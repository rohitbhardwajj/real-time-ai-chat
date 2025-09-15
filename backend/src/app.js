const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const authroutes = require('./routes/Auth.route');
const generateResponse = require("./services/ai.service");

const app = express();

let chatHistory = []; // Global chat history

app.use(cookieParser());
app.use(express.json());

app.use('/api', authroutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Backend working fine!');
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });

  socket.on("ai-message", async (data) => {
    console.log("📝 User Message:", data);

    // Push user message to chatHistory
    chatHistory.push({ role: "user", parts: [{ text: data }] });

    // Get AI response
    const ans = await generateResponse(chatHistory);

    // Push AI response to chatHistory
    chatHistory.push({ role: "assistant", parts: [{ text: ans }] });

    // Send back to frontend
    socket.emit("response-de", ans);

    console.log("📜 Chat History:", chatHistory);
  });
});

module.exports = { app, httpServer };
