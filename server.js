const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const flavors = [
  'Strawberry Classic',
  'Double Chocolate',
  'Vanilla Bean Dream',
  'Pistachio Swirl',
  'Salted Caramel Crunch',
  'Banana Split Bliss',
  'Cookies & Cream',
  'Berry Cheesecake',
  'Mango Tango',
  'Minty Chocolate Chip'
];

const bases = [
  'whole milk',
  'almond milk',
  'oat milk',
  'soy milk',
  'coconut milk',
  'hazelnut milk'
];

const toppings = [
  'whipped cream and sprinkles',
  'caramel drizzle',
  'dark chocolate shavings',
  'chopped nuts',
  'fresh berries',
  'cookie crumbs',
  'marshmallows',
  'cinnamon dust',
  'chocolate syrup',
  'toffee bits'
];

const images = [
  'assets/image-1779900833516.png',
  'assets/image-1779900840670.png',
  'assets/image-1779900892165.png',
  'assets/image-1779900918696.png'
];

const prizes = [
  { name: 'Golden Sip', description: 'Free extra topping and surprise bonus treat.' },
  { name: 'Cool Coupon', description: '20% off your next milkshake order.' },
  { name: 'Tasty Treat', description: 'A sweet thank-you gift for your next visit.' },
  { name: 'VIP Straw', description: 'Priority access to new seasonal flavors.' }
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
    'Strawberry Classic': 4.99,
    'Double Chocolate': 5.49,
    'Vanilla Bean Dream': 5.19,
    'Pistachio Swirl': 5.79,
    'Salted Caramel Crunch': 5.89,
    'Banana Split Bliss': 5.29,
    'Cookies & Cream': 5.59,
    'Berry Cheesecake': 5.69,
    'Mango Tango': 5.39,
    'Minty Chocolate Chip': 5.49
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
    description: `A creamy milkshake made with ${base}, finished with ${topping}.`,
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
  console.log(`Milkshake backend running at http://localhost:${port}`);
});
