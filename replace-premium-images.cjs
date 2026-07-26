const fs = require('fs');

const path = require('path');

const premiumImages = [
  '/images/premium-wedding.png',
  '/images/premium-portrait.png',
  '/images/premium-maternity.png',
  '/images/premium-prewedding.png'
];

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles('e:/lytro/photography-website/src');
let count = 0;

files.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  let changed = false;
  
  // Replace unsplash images
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?w=\d+&q=\d+/g, () => {
     changed = true;
     return premiumImages[(count++) % premiumImages.length];
  });

  // Just in case any imginn links are still lingering somehow, though we replaced them
  content = content.replace(/https:\/\/s9\.imginn\.com\/[^']*?\.(?:jpg|webp)/g, () => {
    changed = true;
    return premiumImages[(count++) % premiumImages.length];
  });

  if (changed) {
    fs.writeFileSync(p, content);
  }
});

console.log('Premium images applied successfully to ' + count + ' places.');
