const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KitapSchema = new Schema({
    kitapIsmi: {
        type: String,
        require: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    sayfaSayisi: {
        type: Number,
        require: true
    },
    aciklama: {
        type: String,
        require: true,
        minLength: 10,
        maxLength: 100,
        unique: true
    },
    yazarAdiSoyadi: {
        type: String,
        require: true,
        minLength: 10,
        maxLength: 100,
    }
}, {
    collection: 'Kitaplar',
    timestamps: true
});


const KitapModel = mongoose.model('Kitap', KitapSchema);


module.exports = KitapModel;