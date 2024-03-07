require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT;


const tempUrl = process.env.MONGO_URL;
const password = process.env.MONGO_PASSWORD;
const url = tempUrl.replace("<password>", password);

const connectToDb = ()=> {
    mongoose.connect(url)
    .then(console.log("Connected to DB succesfully!"))
    .catch(error => {console.log("error occured while connecting ", error);});
}

connectToDb()




app.listen(port, ()=>{ console.log(`listening on port ${port}...`);})

