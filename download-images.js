const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    {
        url: "https://images.unsplash.com/photo-1565552684305-7e8d5eb8bdd2?q=80&w=2070&auto=format&fit=crop",
        dest: "public/images/makkah.jpg"
    },
    {
        url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop",
        dest: "public/images/madinah.jpg"
    }
];

// Ensure directory exists
const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

images.forEach(img => {
    const file = fs.createWriteStream(path.join(__dirname, img.dest));
    https.get(img.url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(() => console.log(`Downloaded ${img.dest}`));
        });
    }).on('error', function (err) {
        fs.unlink(img.dest);
        console.error(`Error downloading ${img.dest}: ${err.message}`);
    });
});
