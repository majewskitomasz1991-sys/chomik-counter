import Jimp from 'jimp';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json','utf8'));

const bg = await Jimp.read('./background.jpg');
const logo = await Jimp.read('./logo.png');

const W = bg.bitmap.width;
const H = bg.bitmap.height;

// logo w koło
logo.resize(125,125);
const mask = new Jimp(125,125,0x00000000);
mask.scan(0,0,125,125, function(x,y,idx){
  const dx=x-62.5, dy=y-62.5;
  if(dx*dx+dy*dy<58*58) { this.bitmap.data[idx+3]=255; } 
});
logo.mask(mask,0,0);

bg.composite(logo, 8, 8);

// limonkowe napisy - duże
const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
const greenFont = font;
bg.print(font, 165, 15, {text: `WYS: ${String(data.views).padStart(5,'0')}`, alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT}, 400, 50);
bg.print(font, 165, 75, {text: `ODW: ${String(data.uniques).padStart(5,'0')}`, alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT}, 400, 50);

// pomaluj na limonke - filtr
bg.color([{apply:'tint', params:[{r:50,g:255,b:0}]}]);

await bg.writeAsync('./counter.png');
console.log('OK BIG');
