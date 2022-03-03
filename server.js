const express = require("express");
const path = require("path");
const multer = require("multer");

const uploadController = require("./routes/upload");
const modelController = require("./routes/model");

const upload = multer({ dest: "./uploads/" });
const PORT = 5000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("xray"), uploadController);

app.get("/model", modelController);

app.use("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
    console.log("Listening at port", PORT);
});
