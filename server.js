const express = require("express");

const welcomeRouter = require("./routers/welcome-router");

const usersRouter = require('./routers/users-router');
const cookieParser = require('cookie-parser')

const restrict = require('./routers/middleware/restricted');

const cors = require('cors')
const helmet = require('helmet')


const server = express();

server.use(express.json());
server.use(helmet())
server.use(cors())
server.use(cookieParser())
server.use("/", welcomeRouter);

server.use('/users', usersRouter);


server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Server error? Something isn't right."
    });
});

module.exports = server;
