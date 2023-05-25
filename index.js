const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://georgievkn82:S2UNdFGTzPCVz9TE@cluster0.udwqatw.mongodb.net/ShoppingApp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/api/products', async (req, res) => {
  try {
    const db = client.db('ShoppingApp');
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    console.error('Грешка при търсене на продуктите', err);
    res.status(500).json({ error: 'Възникна грешка' });
  }
});


app.listen(process.env.PORT || 3000)
