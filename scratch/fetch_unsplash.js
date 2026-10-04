const https = require('https');

const topics = ['robot', 'farm', 'drone', 'solar', 'factory', 'logistics', 'circuit', 'smart-home'];
topics.forEach(topic => {
  https.get(`https://unsplash.com/ngetty/v3/search/images?keyword=${topic}&page=1`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const images = json.results?.slice(0, 3).map(r => r.id) || [];
        console.log(`${topic}: ${images.join(', ')}`);
      } catch(e) { console.log(topic, 'error'); }
    });
  });
});
