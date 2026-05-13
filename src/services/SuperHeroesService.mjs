import superHeroRepository from '../repositories/SuperHeroRepository.mjs';


// funciones  PARA EL CONTROLADOR 


export async function getAllSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function getSuperheroeById(id) {
    const superheroe = await superHeroRepository.obtenerPorId(id);
    if (!superheroe) throw new Error('Superhéroe no encontrado');
    return superheroe;
}

export async function createSuperheroe(data) {
    // Procesar arrays si vienen como string desde el formulario
    if (data.poderes && typeof data.poderes === 'string') {
        data.poderes = data.poderes.split(',').map(p => p.trim());
    }
    if (data.aliados && typeof data.aliados === 'string') {
        data.aliados = data.aliados.split(',').map(a => a.trim());
    }
    if (data.enemigos && typeof data.enemigos === 'string') {
        data.enemigos = data.enemigos.split(',').map(e => e.trim());
    }
    
    return await superHeroRepository.crear(data);
}

export async function updateSuperheroe(id, data) {
    // Procesar arrays si vienen como string
    if (data.poderes && typeof data.poderes === 'string') {
        data.poderes = data.poderes.split(',').map(p => p.trim());
    }
    if (data.aliados && typeof data.aliados === 'string') {
        data.aliados = data.aliados.split(',').map(a => a.trim());
    }
    if (data.enemigos && typeof data.enemigos === 'string') {
        data.enemigos = data.enemigos.split(',').map(e => e.trim());
    }
    
    const superheroe = await superHeroRepository.actualizar(id, data);
    if (!superheroe) throw new Error('Superhéroe no encontrado');
    return superheroe;
}

export async function deleteSuperheroe(id) {
    const superheroe = await superHeroRepository.eliminarPorId(id);
    if (!superheroe) throw new Error('Superhéroe no encontrado');
    return superheroe;
}


// MÉTODOS ADICIONALES (español)


export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}



export async function buscarPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

