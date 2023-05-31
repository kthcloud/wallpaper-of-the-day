const http = require('http');
const https = require('https');

const CACHE_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
const PORT = process.env.APP_PORT || 8080;

let cachedImage = null;
let cacheTime = 0;

function getImageUrl(callback) {
  https.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=se-SE', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const imageUrl = 'https://bing.com' + JSON.parse(data).images[0].url;
      callback(imageUrl);
    });
  }).on('error', (err) => {
    console.error('Error fetching image URL:', err);
  });
}

function getImage(callback) {
  const now = Date.now();
  if (cachedImage && now - cacheTime < CACHE_TIME) {
    callback(cachedImage);
  } else {
    getImageUrl((imageUrl) => {
      https.get(imageUrl, (res) => {
        const chunks = [];
        res.on('data', (chunk) => {
          chunks.push(chunk);
        });
        res.on('end', () => {
          cachedImage = Buffer.concat(chunks);
          cacheTime = now;
          callback(cachedImage);
        });
      }).on('error', (err) => {
        console.error('Error fetching image:', err);
      });
    });
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    getImage((image) => {
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=' + (CACHE_TIME / 1000)
      });
      res.end(image);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});