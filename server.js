const express = require("express");
const path = require("path");
const multer = require("multer");

const uploadController = require("./routes/upload");
const modelController = require("./routes/model");

const upload = multer({ dest: "./public/uploads/" });
const PORT = 7000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.post("/upload", upload.single("xray"), uploadController);

app.get("/model", upload.none(), modelController);

app.use("/success", (req, res, next) => {
    let result = -1;
    if (res.app.locals.result != undefined) result = res.app.locals.result;
    res.render("index.ejs", { isUploaded: true, result: result });
});

app.use("/", upload.none(), (req, res, next) => {
    res.render("index.ejs", { isUploaded: false, result: -1 });
});

app.listen(PORT, () => {
    console.log("Listening at port", PORT);
});
