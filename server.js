const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello World"));

// For heroku process.env.PORT
// http://localhost:5000/
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
