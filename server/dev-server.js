require("dotenv").config();
const express = require("express");

const requestCv = require("../api/request-cv");
const cvAction = require("../api/cv-action");
const adminLogin = require("../api/admin-login");
const adminRequests = require("../api/admin-requests");
const adminApprove = require("../api/admin-approve");
const adminReject = require("../api/admin-reject");
const contact = require("../api/contact");
const adminContactMessages = require("../api/admin-contact-messages");

const app = express();
app.use(express.json());

app.post("/api/request-cv", requestCv);
app.get("/api/cv-action", cvAction);
app.post("/api/admin-login", adminLogin);
app.get("/api/admin-requests", adminRequests);
app.post("/api/admin-approve", adminApprove);
app.post("/api/admin-reject", adminReject);
app.post("/api/contact", contact);
app.get("/api/admin-contact-messages", adminContactMessages);

const PORT = process.env.API_PORT || 3002;
app.listen(PORT, () => {
  console.log(`API dev server running on http://localhost:${PORT}`);
});
