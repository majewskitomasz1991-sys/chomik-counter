import Jimp from 'jimp';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json','utf8'));

const bg = await Jimp.read('./background.jpg');
const logo = await Jimp.read('./logo.png');

// logo 125px
logo.resize(125, 125);
bg.composite(logo, 8, 8);

// limonkowy prostokąt pod logo
const circle = new Jimp(140, 140, 0x00000000);
circle.scan(0,0,140,140, (x,y,idx)=>{
  const dx=x-70, dy=y-70;
  if(Math.sqrt(dx*dx+dy*dy) < 67){
    circle.bitmap.data[idx]=0;
    circle.bitmap.data[idx+1]=255;
    circle.bitmap.data[idx+2]=0;
    circle.bitmap.data[idx+3]=60;
  }
});
bg.composite(circle, 0, 0);

// DUŻE napisy
const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
bg.print(font, 165, 20, `WYS: ${String(data.views||1247).padStart(5,'0')}`);
bg.print(font, 165, 75, `ODW: ${String(data.uniques||892).padStart(5,'0')}`);

// filtr na limonke
bg.color([{apply:'mix', params:['#32FF00', 35]}]);

await bg.writeAsync('./counter.png');
console.log('BIG DONE');
