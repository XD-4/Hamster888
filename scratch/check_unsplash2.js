const http = require('https');
const ids = ['1518770660439-4636190af475', '1581091226825-a6a2a5aee158', '1531746790731-6c087fecd65a', '1589254065878-42c9da997008', '1534970028765-38ce47ef7d8d'];
async function check() {
  for (const id of ids) {
    await new Promise(r => {
      http.get(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=600`, (res) => {
        if (res.statusCode === 200) console.log(`VALID: ${id}`);
        res.resume();
        r();
      }).on('error', () => r());
    });
  }
}
check();
