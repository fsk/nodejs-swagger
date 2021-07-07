const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(_ => console.log(`Baglanti saglandi`))
    .catch(err => console.log(`Baglanti sirasinda hata olustu.: ${err}`));