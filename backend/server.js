const { httpServer } = require('./src/app');
require("dotenv").config();   
const connectDb = require("./src/db/db");

connectDb(process.env.MONGO_URL);

const PORT = process.env.PORT || 5000;


httpServer.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
