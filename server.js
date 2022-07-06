const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const {createBodyPart, createAvatar} = require("./controllers/AvatarBuilder")
const components = require("./assets/components.json");

const app = express();
app.use(cors())

const jsonParser = bodyParser.json();

app.get("/builder", (req, res) => {
    return res.status(200).json(createAvatar());
});

let avatar = createAvatar();

app.post("/builder", jsonParser, (req, res) => {
    const {partType, partName} = req.body;
    createBodyPart(avatar, components[partType][partName]);
    return res.json(avatar.render());
});

app.post("/reset", (req, res) => {
    avatar = createAvatar();
    return res.json(avatar.render());
})

app.listen(3001, () => {
    console.log('app is running on port 3001');
});