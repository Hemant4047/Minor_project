const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/upload", (req, res, next) => {
    let model = -1;
    if (req.body.radio1) {
        console.log("upload Model 1");
        model = 1;
    } else if (req.body.radio2) {
        console.log("upload Model 2");
        model = 2;
    }
    if (model == -1) model = 1;
    fs.rename(
        req.file.path,
        path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "test" + path.extname(req.file.originalname)
        ),
        (err) => {
            if (err) {
                console.log("FILE UPLOAD ERR");
                res.redirect("/model");
            }
            res.app.locals.model = model;
            //next();
            res.redirect("/model");
        }
    );
    //console.log(req.file);
    //res.redirect("/");
});

module.exports = router;
