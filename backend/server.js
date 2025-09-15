const { httpServer } = require('./src/app');
require("dotenv").config();   



const PORT = process.env.PORT || 3000;


httpServer.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
