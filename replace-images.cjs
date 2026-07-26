const fs = require('fs');
const paths = [
  'e:/lytro/photography-website/src/data/index.ts',
  'e:/lytro/photography-website/src/App.tsx',
  'e:/lytro/photography-website/src/components/About.tsx'
];
const unsplashUrls = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
  'https://images.unsplash.com/photo-1518706316278-f07823528f14?w=800&q=80'
];

paths.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/https:\/\/s9\.imginn\.com\/[^']*?\.(?:jpg|webp)/g, () => {
     return unsplashUrls[Math.floor(Math.random() * unsplashUrls.length)];
  });
  fs.writeFileSync(p, content);
});
console.log('Images replaced successfully');
