const fs = require('fs');

const width = 1000;
const height = 1000;
const dir = __dirname;

const rarity = [
    { key: '', val: 'original' },
    { key: '_r', val: 'rare' },
    { key: '_sr', val: 'super rare' }
];

const addRarity = (string) => {
    let itemRarity;
    rarity.forEach(r => {
        if (string.includes(r.key)) {
            itemRarity = r.val;
        }
    });
    return itemRarity;
};

const cleanName = (string) => {
    let name = string.slice(0, -4);
    rarity.forEach(r => {
        name = name.replace(r.key, "");
    });
    return name;
}

const getElements = (path) => {
    return fs
        .readdirSync(path)
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((i, index) => {
            return {
                id: index + 1,
                name: cleanName(i),
                fileName: i,
                rarity: addRarity(i)
            }
        });
}

const layers = [{
    id: 1,
    name: 'Gunung',
    location: `${dir}/Gunung/`,
    elements: getElements(`${dir}/Gunung/`),
    position: { x: 0, y: 0 },
    size: { width, height }
}, {
    id: 1,
    name: 'Matahari',
    location: `${dir}/Matahari/`,
    elements: getElements(`${dir}/Matahari/`),
    position: { x: 0, y: 0 },
    size: { width, height }
}, {
    id: 1,
    name: 'Sawah',
    location: `${dir}/Sawah/`,
    elements: getElements(`${dir}/Sawah/`),
    position: { x: 0, y: 0 },
    size: { width, height }
}, {
    id: 1,
    name: 'Jalan',
    location: `${dir}/Jalan/`,
    elements: getElements(`${dir}/Jalan/`),
    position: { x: 0, y: 0 },
    size: { width, height }
}];

module.exports = {
    layers,
    width,
    height
};
