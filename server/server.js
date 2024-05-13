const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on('uncaughtException',(err)=>{
  console.log(err.name , err.message);
  console.log("UNCAUGHT EXCEPTION 💣 Shutting down ... ");
  process.exit(1); 
})


dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = process.env.DB_URI.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, { dbName: "Ecommerce_db" })
  .then(() => console.log("db connected successfully"))


const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}.`);
});

process.on('unhandledRejection',(err)=>{
  console.log(err.name , err.message);
  console.log("UNHANDLED ERROR 💣 Shutting down ... ");
  server.close(()=>{
    process.exit(1)
  })
})
