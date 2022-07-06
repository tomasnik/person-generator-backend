const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const {createBodyPart, createAvatar} = require("./controllers/AvatarBuilder")
const components = require("./assets/components.json");

const app = express();
app.use(cors())

const jsonParser = bodyParser.json();

const componentsKeys = Object.keys(components);

app.get("/builder", (req, res) => {
    return res.status(200).json(createAvatar());
});

app.get("/types", (req, res) => {
    return res.status(200).json(componentsKeys);
});

app.get("/names/:type", (req, res) => {
    const type = req.params.type;
    if (componentsKeys.includes(type)) {
        return res.status(200).json(Object.keys(components[type]));
    }
    return res.status(404).json("not found");
})

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