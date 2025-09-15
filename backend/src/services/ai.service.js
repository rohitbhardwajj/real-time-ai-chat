const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateResponse(chatHistory) {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyB6ud8iUlZ-t7FO387Ax1Ea_UB81XeXtiY");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("🔄 Sending chatHistory to Gemini...");
    console.log(JSON.stringify(chatHistory, null, 2));

    const result = await model.generateContent({ contents: chatHistory });

    console.log("🟢 Raw Gemini Result:", JSON.stringify(result, null, 2));

    const text = result.response?.text?.();
    console.log("🤖 AI Response:", text);

    return text || "⚠️ No response generated!";
  } catch (err) {
    console.error("❌ Error in generateResponse:", err.message);
    return "⚠️ Error generating response!";
  }
}

module.exports = generateResponse;
