const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require('mongoose');
const app = require("./app");

const DB = process.env.DB_URI.replace('<password>',process.env.DB_PASSWORD);
mongoose.connect(DB).then(()=>console.log("db connected successfully"))


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app running on port ${port}.`);
});
