const fs = require('fs');
const myArgs = process.argv.slice(2);

if (!myArgs.length) {
    throw new Error('ipfs cid is needed');
}
const dir = './output/metadata/';

fs.readdirSync(dir)
    .forEach((file) => {
        const raw = fs.readFileSync(`${dir}${file}`);
        const metadata = JSON.parse(raw);
        const newMetadata = {
            ...metadata,
            image: `${myArgs[0]}/${metadata.name.replace('#', '')}.png`
        };
        fs.writeFileSync(`${dir}${file}`, JSON.stringify(newMetadata, null, 2));
    });