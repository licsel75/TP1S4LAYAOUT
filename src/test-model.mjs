import mongoose from 'mongoose';
import { connectDB } from './config/dbConfig.mjs';
import SuperHero from './models/SuperHero.mjs';

const testModel = async () => {
    try {
        await connectDB();
        
        // Crear un héroe de prueba
        const nuevoHeroe = new SuperHero({
            nombreSuperHeroe: 'PruebaConexion',
            nombreReal: 'Test User',
            edad: 25,
            planetaOrigen: 'Tierra',
            poderes: ['Test', 'Debug']
        });
        
        await nuevoHeroe.save();
        console.log('✅ Héroe guardado:', nuevoHeroe.nombreSuperHeroe);
        
        // Buscar todos
        const heroes = await SuperHero.find();
        console.log('📋 Total de héroes:', heroes.length);
        
        // Limpiar: eliminar el héroe de prueba
        await SuperHero.findByIdAndDelete(nuevoHeroe._id);
        console.log('🗑️ Héroe de prueba eliminado');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testModel();