import mongoose from 'mongoose';

const superHeroSchema = new mongoose.Schema({
    nombreSuperHeroe: {
        type: String,
        required: [true, 'El nombre del superhéroe es obligatorio'],
        unique: true,
        trim: true
    },
    nombreReal: {
        type: String,
        required: [true, 'El nombre real es obligatorio'],
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        min: [0, 'La edad no puede ser negativa']
    },
    planetaOrigen: {
        type: String,
        default: 'Tierra'
    },
    debilidad: {
        type: String,
        default: 'Ninguna'
    },
    poderes: [String],
    aliados: [String],
    enemigos: [String]
}, {
    timestamps: true
});

// nombre de la colección 
const SuperHero = mongoose.model('SuperHero', superHeroSchema, 'Grupo-15');

export default SuperHero;