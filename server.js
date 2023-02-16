const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

const router = express.Router();

app.use(express.json());

mongoose.connect('mongodb+srv://honghaigttn123:Hai.110697@cluster0.upy5kfn.mongodb.net/test',
    {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

router.get("/", (req, res) => {
    res.json({
        hello: "hi!"
    });
});

app.use(`/.netlify/functions/api`, router);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at port 3000");
});
