const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function makeWhiteLogo() {
  const img = await loadImage('public/logo.png');
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    // If pixel is mostly white/light background (and not transparent), make it transparent
    if (r > 200 && g > 200 && b > 200 && a > 100) {
      data[i+3] = 0; // make transparent
    } else if (a > 50) {
      // Make colored pixels white
      data[i] = 255;
      data[i+1] = 255;
      data[i+2] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/logo-white.png', buffer);
  console.log('White logo created!');
}

makeWhiteLogo().catch(console.error);
