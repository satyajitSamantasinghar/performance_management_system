const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
    res.send('PAS Backend Running');
});
app.get("/test-db", (req, res) => {
    res.json({ message: "MongoDB connected and API working" });
});
app.use("/api/auth", authRoutes);


module.exports = app;
