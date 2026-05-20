const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const cors = require('cors');
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;