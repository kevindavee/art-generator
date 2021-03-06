const fs = require('fs');
const myArgs = process.argv.slice(2);
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");
const { layers } = require('./input/config');
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;

let attributes = [];
let hash = []; // Hash the layers so we can back track if we want to generate the same image
let decodedHash = [];

const computeMetadata = (_edition) => {
    const tempMetadata = {
        name: `#${_edition}`,
        description: '',
        external_url: '',
        image: '',
        attributes: attributes,
        hash: hash.join(""),
        decodedHash: decodedHash,
    };
    hash = [];
    attributes = [];
    decodedHash = [];
    return tempMetadata;
};

const addAttribute = (_element, _layer) => {
    const attr = {
        value: _element.rarity,
        trait_type: `Rarity ${_layer.name}`
    };

    attributes.push(attr);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedHash.push({ [_layer.id]: _element.id });
}

const saveLayer = async (_canvas, _edition) => {
    fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const drawLayer = async (_layer, _edition) => {
    let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    addAttribute(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);
    ctx.drawImage(image, _layer.position.x, _layer.position.y, _layer.size.width, _layer.size.height);
    await saveLayer(canvas, _edition);
};

(async () => {
    for (let i = 0; i < edition; i++) {
        for (const layer of layers) {
            await drawLayer(layer, i);
        }
        const metadata = computeMetadata(i);
        fs.writeFileSync(`./output/metadata/${i}.json`, JSON.stringify(metadata, null, 2));
        ctx.clearRect(0, 0, 1000, 1000);
    }
})();
