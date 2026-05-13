/**
 * Interfaz o contrato base para todos los repositorios
 * Define los métodos obligatorios
 */
class IRepository {
  obtenerPorId(id) {
    throw new Error("Método 'obtenerPorId()' debe ser implementado");
  }

  obtenerTodos() {
    throw new Error("Método 'obtenerTodos()' debe ser implementado");
  }

  crear(data) {
    throw new Error("Método 'crear()' debe ser implementado");
  }

  actualizar(id, data) {
    throw new Error("Método 'actualizar()' debe ser implementado");
  }

  eliminarPorId(id) {
    throw new Error("Método 'eliminarPorId()' debe ser implementado");
  }

  buscarPorAtributo(atributo, valor) {
    throw new Error("Método 'buscarPorAtributo()' debe ser implementado");
  }
}

export default IRepository;