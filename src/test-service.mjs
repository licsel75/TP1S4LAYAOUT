import { connectDB } from './config/dbConfig.mjs';
import { getAllSuperheroes, createSuperheroe, deleteSuperheroe } from './services/SuperHeroesService.mjs';

const testService = async () => {
    try {
        await connectDB();
        
        console.log('📋 Probando servicio...');
        
        // Obtener todos
        const todos = await getAllSuperheroes();
        console.log('✅ Total de héroes:', todos.length);
        
        // Crear uno nuevo
        const nuevo = await createSuperheroe({
            nombreSuperHeroe: 'ServiceTest',
            nombreReal: 'Test Service',
            edad: 35
        });
        console.log('✅ Creado:', nuevo.nombreSuperHeroe);
        
        // Eliminar
        await deleteSuperheroe(nuevo._id);
        console.log('🗑️ Eliminado');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testService();