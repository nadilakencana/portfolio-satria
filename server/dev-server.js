require("dotenv").config();
const express = require("express");

const requestCv = require("../api/request-cv");
const cvAction = require("../api/cv-action");

const app = express();
app.use(express.json());

app.post("/api/request-cv", requestCv);
app.get("/api/cv-action", cvAction);

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API dev server running on http://localhost:${PORT}`);
});
