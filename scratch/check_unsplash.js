const http = require('https');

const ids = [
  '1680608979589-e9349ed066d5', '1737644467636-6b0053476bb2', '1485827404703-89b55fcc595e',
  '1661933050836-3f9e3d7eda61', '1717386255773-1e3037c81788', '1496247749665-49cf5b1022e9',
  '1679917152396-4b18accacb9d', '1509391366360-2e959784a276', '1558449028-b53a39d100fc',
  '1714618849685-89cad85746b1', '1473968512647-3e447244af8f', '1521405924368-64c5b84bec60',
  '1688686804638-fadb460edc4a', '1558002038-1055907df827', '1519558260268-cde7e03a0152'
];

async function check() {
  for (const id of ids) {
    await new Promise(r => {
      http.get(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=600`, (res) => {
        if (res.statusCode === 200) {
          console.log(`VALID: ${id}`);
        }
        res.resume();
        r();
      }).on('error', () => r());
    });
  }
}
check();
