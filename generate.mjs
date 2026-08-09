import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
const data = JSON.parse(fs.readFileSync('./data.json','utf8'))
const bg = await loadImage('./background.jpg')
const W = bg.width; const H = bg.height
const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')
ctx.drawImage(bg, 0, 0, W, H)
try{
  const logo = await loadImage('./logo.png')
  ctx.save()
  ctx.beginPath()
  ctx.arc(70, 70, 58, 0, Math.PI*2)
  ctx.clip()
  ctx.drawImage(logo, 8, 8, 125, 125)
  ctx.restore()
  ctx.strokeStyle = "#32FF00"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(70, 70, 60, 0, Math.PI*2)
  ctx.stroke()
}catch(e){}

ctx.fillStyle = "#32FF00"
ctx.shadowColor = "#32FF00"
ctx.shadowBlur = 15
ctx.font = "bold 44px monospace"
ctx.fillText(`WYS: ${String(data.views).padStart(5,'0')}`, 165, 58)
ctx.fillText(`ODW: ${String(data.uniques).padStart(5,'0')}`, 165, 115)

fs.writeFileSync('./counter.png', canvas.toBuffer('image/png'))