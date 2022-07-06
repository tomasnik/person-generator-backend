const svg = require("svg-builder");
const components = require("../assets/components.json");

function createBodyPart(avatar, coords) {
    // TODO CSS řešit v Avatar.css
    avatar.path({
        fill: "none",
        stroke: "#231f20",
        d: coords
    });
}

function createAvatar() {
    const avatar = svg.newInstance();
    avatar.width(110).height(140);
    return avatar;
}

function createRandomAvatar() {
    const avatar = svg.newInstance();
    avatar.width(110).height(140);
    for (const component in components) {
        const componentValues = Object.values(components[component])
        const result = componentValues[Math.floor(Math.random() * componentValues.length)];
        if (result) {
            createBodyPart(avatar, result);
        }
    }
    return avatar.render();
}

module.exports = {
    createAvatar,
    createBodyPart,
    createRandomAvatar
}