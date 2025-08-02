const express = require("express");
const cors = require("cors");
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
app.use("/uploads", express.static("uploads"));

// Routes cho muon sach
const muonSachRoutes = require("./routes/muonsach.route");
app.use("/muonsach", muonSachRoutes);

// Routes cho nhanvien
const nhanvienRoutes = require("./routes/nhanvien.route");
app.use("/nhanvien", nhanvienRoutes);

// Routes cho nha xuat ban
const nxbRoutes = require("./routes/nxb.route");
app.use("/nxb", nxbRoutes);

// Lang nghe va chay chuong trinh
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
