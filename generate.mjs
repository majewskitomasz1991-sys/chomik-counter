import sharp from 'sharp';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json','utf8'));
const views = String(data.views || 1247).padStart(5,'0');
const uniques = String(data.uniques || 892).padStart(5,'0');

const svg = `<svg width="500" height="150"><style>.t{fill:#BFFF00;font:900 36px Arial;stroke:#000;stroke-width:5px;paint-order:stroke}</style><text x="165" y="55" class="t">WYS: ${views}</text><text x="165" y="105" class="t">ODW: ${uniques}</text></svg>`;

await sharp('./background.jpg').resize(500,150)
 .composite([
    { input: await sharp('./logo.png').resize(120,120).toBuffer(), left: 10, top: 15 },
    { input: Buffer.from(svg), left: 0, top: 0 }
  ])
 .toFile('./counter.png');
