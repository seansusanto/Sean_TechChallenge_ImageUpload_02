const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});