const fs = require('fs');
const path = require('path');

try {
  const imgPath = path.join(__dirname, 'public', 'images', 'lk-logo.jpeg');
  const imgData = fs.readFileSync(imgPath).toString('base64');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
  </defs>
  <image width="100" height="100" href="data:image/jpeg;base64,${imgData}" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'favicon.svg'), svg);
  console.log('Successfully created rounded SVG favicon!');
} catch (error) {
  console.error('Error creating favicon:', error);
}
