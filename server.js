const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const flavors = [
  'Erdbeer-Klassiker',
  'Doppelte Schokolade',
  'Vanilleschoten-Traum',
  'Pistazien-Wirbel',
  'Salzkaramell-Crunch',
  'Bananensplit-Glück',
  'Cookies & Cream',
  'Beeren-Cheesecake',
  'Mango Tango',
  'Minz-Schoko-Splitter'
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
  'Schlagsahne und Streuseln',
  'Karamellsauce',
  'Dunklen Schokoladenraspeln',
  'Gehackten Nüssen',
  'Frischen Beeren',
  'Kekskrümeln',
  'Marshmallows',
  'Zimtstaub',
  'Schokoladensauce',
  'Toffeestückchen'
];

const images = [
  'assets/image-1779900833516.png',
  'assets/image-1779900840670.png',
  'assets/image-1779900892165.png',
  'assets/image-1779900918696.png'
];

const prizes = [
  { name: 'Goldener Schluck', description: 'Ein gratis Extra-Topping und eine süße Überraschung.' },
  { name: 'Cooler Gutschein', description: '20% Rabatt auf deine nächste Milchshake-Bestellung.' },
  { name: 'Leckere Belohnung', description: 'Ein kleines Dankeschön-Geschenk für deinen nächsten Besuch.' },
  { name: 'VIP-Strohhalm', description: 'Bevorzugter Zugang zu neuen saisonalen Sorten.' }
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildMilkshake() {
  const flavor = randomItem(flavors);
  const base = randomItem(bases);
  const topping = randomItem(toppings);
  const imageUrl = randomItem(images);

  const priceMap = {
    'Erdbeer-Klassiker': 4.99,
    'Doppelte Schokolade': 5.49,
    'Vanilleschoten-Traum': 5.19,
    'Pistazien-Wirbel': 5.79,
    'Salzkaramell-Crunch': 5.89,
    'Bananensplit-Glück': 5.29,
    'Cookies & Cream': 5.59,
    'Beeren-Cheesecake': 5.69,
    'Mango Tango': 5.39,
    'Minz-Schoko-Splitter': 5.49
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
    description: `Ein cremiger Milchshake zubereitet mit ${base}, verfeinert mit ${topping}.`,
    cost: cost.toFixed(2),
    prizeName: prize.name,
    prizeDescription: prize.description,
    imageUrl,
    actualLook: imageUrl,
    prizeTier: prize.name
  };
}

app.use(express.static(path.join(__dirname, '.')));

app.get('/api/milkshake', (req, res) => {
  res.json(buildMilkshake());
});

app.listen(port, () => {
  console.log(`Milchshake-Backend läuft unter http://localhost:${port}`);
});