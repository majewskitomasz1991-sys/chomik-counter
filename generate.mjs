import sharp from 'sharp';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json','utf8'));
const views = String(data.views || 1247).padStart(5,'0');
const uniques = String(data.uniques || 892).padStart(5,'0');

const bg = await sharp('./background.jpg').resize(500,150).toBuffer();
const logo = await sharp('./logo.png').resize(125,125).png().toBuffer();

// SVG z dużymi limonkowymi napisami
const svgText = `
<svg width="500" height="150">
  <style>
    .big { fill: #ADFF2F; font-size: 38px; font-family: Arial Black, sans-serif; font-weight: 900; paint-order: stroke; stroke: black; stroke-width: 6px; stroke-linejoin: round; }
  </style>
  <text x="165" y="55" class="big">WYS: ${views}</text>
  <text x="165" y="110" class="big">ODW: ${uniques}</text>
</svg>`;

const svgBuffer = Buffer.from(svgText);

await sharp(bg)
  .composite([
    { input: logo, left: 8, top: 12 },
    { input: svgBuffer, left: 0, top: 0 }
  ])
  .png()
  .toFile('./counter.png');

console.log('DONE BIG SHARP');
