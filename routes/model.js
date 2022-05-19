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

const getModel2 = async () => {
    const m = await tf.loadLayersModel(
        "file://" + path.join(__dirname, "..", "model2", "model.json") // or D:/Minor_project/model2/model.json
    );
    return m;
};

const model = getModel();
const model2 = getModel2();

router.get("/model", (req, res, next) => {
    console.log("MODEL:", req.app.locals.model);
    const chosenModel = req.app.locals.model == 1 ? model : model2;
    const inputShape = req.app.locals.model == 1 ? [400, 400] : [500, 500];
    chosenModel.then((m) => {
        fs.readFile(
            path.join(__dirname, "..", "public", "uploads", "test.jpeg"),
            (err, img) => {
                if (err) res.redirect("/");
                let tensor = tf.node.decodeJpeg(img, 3); // grayscale, 1 channel
                tensor = tf.image
                    .resizeBilinear(tensor, inputShape)
                    .expandDims();
                // console.log(tensor);
                const prediction = m
                    .predict(tensor, { batchSize: 24 })
                    .arraySync();
                res.app.locals.result = prediction[0][0];
                console.log(prediction);
                res.redirect("/success");
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
