import SuperHero from '../models/SuperHero.mjs'; // importamos el modelo
import IRepository from './IRepository.mjs'; //importamos el contrato

class SuperHeroRepository extends IRepository { // esta clase va a seguir el contrato establecido por IRepository
  //me comprometo a seguir este contrato, heredas métodos
  
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async crear(data) {
    const nuevoHeroe = new SuperHero(data);
    await nuevoHeroe.save();
    return nuevoHeroe;
  }

  async actualizar(id, data) {
    return await SuperHero.findByIdAndUpdate(id, data, { new: true });
  }
  
  
  async eliminarPorId(id) {
    return await SuperHero.findByIdAndDelete(id);
  }

  // async buscarPorAtributo(atributo, valor) {
  //   const query = {};
  //   query[atributo] = valor;
  //   return await SuperHero.find(query);
  // }

  async buscarPorAtributo(atributo, valor) {
    const query = {};
    // $regex = búsqueda parcial | $options: 'i' = insensitive (mayúsculas/minúsculas)
    query[atributo] = { $regex: valor, $options: 'i' };
    return await SuperHero.find(query);
}

  async obtenerMayoresDe30() {
    const mayores = await SuperHero.find({ edad: { $gt: 30 } });
    console.log('📊 REPOSITORIO: Mayores de 30 encontrados:', mayores.length);
    return mayores;
  }

  async eliminarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
  }
}

// Exportar una única instancia (singleton)
export default new SuperHeroRepository();