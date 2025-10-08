const fs = require('fs');
const https = require('https');
const path = require('path');

// List of employees (names and avatar filenames)
const employees = [
    { name: "Alice", file: "alice.jpg" },
    { name: "Bob", file: "bob.jpg" },
    { name: "Charlie", file: "charlie.jpg" },
    { name: "David", file: "david.jpg" },
    { name: "Eva", file: "eva.jpg" },
    { name: "Frank", file: "frank.jpg" },
    { name: "Grace", file: "grace.jpg" },
    { name: "Hannah", file: "hannah.jpg" },
    { name: "Ian", file: "ian.jpg" },
    { name: "Jack", file: "jack.jpg" },
    { name: "Karen", file: "karen.jpg" },
    { name: "Leo", file: "leo.jpg" },
    { name: "Mona", file: "mona.jpg" },
    { name: "Nina", file: "nina.jpg" },
    { name: "Oscar", file: "oscar.jpg" },
];

const avatarsDir = path.join(__dirname, 'public', 'avatars');
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });

employees.forEach(emp => {
    const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random&format=jpg`;
    const filePath = path.join(avatarsDir, emp.file);
    https.get(url, res => {
        if (res.statusCode === 200) {
            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);
            fileStream.on('finish', () => fileStream.close());
        } else {
            console.error(`Failed to download avatar for ${emp.name}`);
        }
    });
});
