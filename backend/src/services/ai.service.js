const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateResponse(chatHistory) {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyBJ4d9qWGxEkKoPruNTBe7AQ5dwqUwkBdA");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const result = await model.generateContent({
      contents: chatHistory
    });

    const text = result.response.text();
    console.log("AI Response:", text);

    return text;
  } catch (err) {
    console.error("Error:", err.message);
    return null;
  }
}

module.exports = generateResponse;
