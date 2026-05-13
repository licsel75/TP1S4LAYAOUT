import { connectDB } from './config/dbConfig.mjs';
import superHeroRepository from './repositories/SuperHeroRepository.mjs';

const testRepository = async () => {
    try {
        await connectDB();
        
        console.log('📋 Probando repositorio...');
        
        // Obtener todos
        const todos = await superHeroRepository.obtenerTodos();
        console.log('✅ Total de héroes:', todos.length);
        
        // Crear uno nuevo
        const nuevo = await superHeroRepository.crear({
            nombreSuperHeroe: 'RepoTest',
            nombreReal: 'Test Repository',
            edad: 99
        });
        console.log('✅ Creado:', nuevo.nombreSuperHeroe);
        
        // Buscar por atributo
        const encontrados = await superHeroRepository.buscarPorAtributo('edad', 99);
        console.log('✅ Encontrados por edad 99:', encontrados.length);
        
        // Eliminar
        await superHeroRepository.eliminarPorId(nuevo._id);
        console.log('🗑️ Eliminado');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testRepository();