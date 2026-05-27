const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Deutsche Sorten passend zum Frontend
const flavors = [
  'Erdbeer-Klassik',
  'Doppelte Schokolade',
  'Vanilletraum',
  'Pistazien-Wirbel',
  'Salzkaramell-Crunch',
  'Bananensplit-Genuss',
  'Keks & Creme',
  'Beeren-Käsekuchen',
  'Mango-Tango',
  'Minz-Schoko-Splinter'
];

const bases = [
  'Vollmilch',
  'Mandelmilch',
  'Hafermilch',
  'Sojamilch',
  'Kokosmilch',
  'Haselnussmilch'
];

const toppings = [
  'Sahne und Streusel',
  'Karamellsauce',
  'Dunkle Schokoraspeln',
  'Gehackte Nüsse',
  'Frische Beeren',
  'Keksstückchen',
  'Marshmallows',
  'Zimt',
  'Schokosirup',
  'Toffee-Stückchen'
];

const prizes = [
  { name: 'Gratis Upgrade', description: 'Ein kostenloses Extra-Topping bei deiner nächsten Lounge-Bestellung.' },
  { name: '2-für-1 Gutschein', description: 'Bringe einen Freund mit und erhalte den zweiten Shake umsonst.' },
  { name: 'Kein Gewinn', description: 'Vielen Dank fürs Mitmachen! Probiere es beim nächsten Shake erneut.' },
  { name: 'VIP-Strohhalm', description: 'Priorisierter Zugang zu unseren exklusiven, saisonalen Sorten.' }
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildMilkshake() {
  const flavor = randomItem(flavors);
  const base = randomItem(bases);
  const topping = randomItem(toppings);

  const priceMap = {
    'Erdbeer-Klassik': 4.99,
    'Doppelte Schokolade': 5.49,
    'Vanilletraum': 5.19,
    'Pistazien-Wirbel': 5.79,
    'Salzkaramell-Crunch': 5.89,
    'Bananensplit-Genuss': 5.29,
    'Keks & Creme': 5.59,
    'Beeren-Käsekuchen': 5.69,
    'Mango-Tango': 5.39,
    'Minz-Schoko-Splinter': 5.49
  };

  const cost = priceMap[flavor] || 5.25;

  let prize = prizes[2];
  const roll = Math.random();
  if (roll < 0.08) {
    prize = prizes[0];
  } else if (roll < 0.25) {
    prize = prizes[1];
  } else if (roll < 0.4) {
    prize = prizes[3];
  }

  return {
    title: flavor,
    description: `Ein cremiger Milkshake mit ${base}, verfeinert mit ${topping}.`,
    cost: cost.toFixed(2),
    prizeName: prize.name,
    prizeDescription: prize.description
  };
}

// Statische Dateien bereitstellen
app.use(express.static(__dirname));

// API-Endpunkt für den Mixer
app.get('/api/milkshake', (req, res) => {
  res.json(buildMilkshake());
});

// Fallback für HTML-Routen
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Milkshake Server läuft auf http://localhost:${port}`);
});