const express = require("express");
const cors = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/db.js");

// middleware
app.use(cors());
app.use(express.json());

// Routes doc gia
const docgiaRoutes = require("./routes/docgia.route.js");
app.use("/docgia", docgiaRoutes);

// Routes sach
const sachRoutes = require("./routes/sach.route.js");
app.use("/sach", sachRoutes);
// Routes cho muon sach
const muonSachRoutes = require("./routes/muonsach.route");
app.use("/muonsach", muonSachRoutes);

// Lang nghe va chay chuong trinh
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
