const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/upload", (req, res, next) => {
    fs.rename(
        req.file.path,
        path.join(
            __dirname,
            "..",
            "uploads",
            "test" + path.extname(req.file.originalname)
        ),
        (err) => {
            if (err) {
                console.log("FILE UPLOAD ERR");
                res.redirect("/model");
            }
            res.redirect("/model");
        }
    );
    //console.log(req.file);
    //res.redirect("/");
});

module.exports = router;
