const app = require("./app");

const dotenv = require("dotenv");

//read config

dotenv.config({path:"backend/config/config.env"});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})