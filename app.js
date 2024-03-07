require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/user");
const jobTypeRouter = require("./routes/jobType");
const jobsRouter = require("./routes/jobs")

const app = express();


// MIDDLEWARES
// app.use(cors);
app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ROUTES
app.get("/api/v1", (req, res)=>{
    console.log("Welcome");
    res.send("welcome to job hunt")
})

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/", usersRouter)
app.use("/api/v1/jobs", jobTypeRouter)
app.use("/api/v1/job", jobsRouter)
app.use("/api/v1/jobs", jobsRouter)



app.all("*", (req, res)=>{
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})



app.use("*", errorHandler)

module.exports = app;