const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'products.js');
let content = fs.readFileSync(filePath, 'utf8');

// Optimize weserv.nl URLs (both already present and new ones)
// Target: https://i.ibb.co/...
content = content.replace(/image:\s*"https:\/\/i\.ibb\.co\/([^"]+)"/g, (match, path) => {
    const fullUrl = `https://i.ibb.co/${path}`;
    return `image: "https://images.weserv.nl/?w=200&h=200&fit=cover&output=webp&url=${fullUrl}"`;
});

// Target existing weserv URLs that might have different params or none
content = content.replace(/image:\s*"https:\/\/images\.weserv\.nl\/\?url=([^"]+)"/g, (match, url) => {
    // If it already has w=600 or something, replace it
    const cleanUrl = url.replace(/&w=\d+/, '').replace(/&auto=compress&cs=tinysrgb&w=\d+/, '');
    return `image: "https://images.weserv.nl/?w=300&h=300&fit=cover&output=webp&url=${cleanUrl}"`;
});

fs.writeFileSync(filePath, content);
console.log('products.js optimized with weserv.nl proxy');
