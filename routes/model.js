const express = require("express");
const tf = require("@tensorflow/tfjs-node");
const path = require("path");
const fs = require("fs");
const { rsqrt } = require("@tensorflow/tfjs-node");
const router = express.Router();

const getModel = async () => {
    const m = await tf.loadLayersModel(
        "file://" + path.join(__dirname, "..", "model", "model.json") // or D:/Minor_project/model/model.json
    );
    return m;
};

const model = getModel();

router.get("/model", (req, res, next) => {
    model.then((m) => {
        fs.readFile(
            path.join(__dirname, "..", "uploads", "test.jpeg"),
            (err, img) => {
                if (err) res.redirect("/");
                let tensor = tf.node.decodeJpeg(img, 1); // grayscale, 1 channel
                tensor = tf.image
                    .resizeBilinear(tensor, [320, 320])
                    .expandDims();
                //console.log(tensor);
                const prediction = m
                    .predict(tensor, { batchSize: 24 })
                    .arraySync();
                console.log(prediction);
                res.redirect("/");
            }
        );
    });

    // model.then((m) => {
    //     const img = fs.readFileSync(
    //         path.join(__dirname, "..", "uploads", "test.jpeg")
    //     );
    //     let tensor = tf.node.decodeImage(img);
    //     tf.image.grayscaleToRGB();
    //     tensor = tf.image.resizeBilinear(tensor, [320, 320]).expandDims();
    //     console.log(tensor);
    //     const prediction = m.predict(tensor, { batchSize: 24 }).arraySync();
    //     console.log(prediction);
    //     res.redirect("/");
    // });
});

module.exports = router;
