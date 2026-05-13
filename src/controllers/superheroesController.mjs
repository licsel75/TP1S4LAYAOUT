import * as superheroeService from '../services/SuperHeroesService.mjs';

// ==========================================
// VISTAS (renderizan plantillas EJS)
// ==========================================

// Dashboard - listar todos
// export const dashboardController = async (req, res) => {
//     try {
//         const superheroes = await superheroeService.getAllSuperheroes();
//         res.render('dashboard', {
//             titulo: 'Dashboard de Superhéroes',
//             superheroes
//         });
//     } catch (error) {
//         console.error('Error en dashboard:', error);
//         res.status(500).send('Error al cargar el dashboard');
//     }
// };



// Dashboard - listar todos o buscar por nombre
export const dashboardController = async (req, res) => {
    try {
        const { nombre } = req.query;  // ← captura lo que viene en ?nombre=...
        let superheroes;

        if (nombre) {
            superheroes = await superheroeService.buscarPorAtributo('nombreSuperHeroe', nombre);
        } else {
            superheroes = await superheroeService.getAllSuperheroes();
        }
//  res.render('dashboardTabla', {
        res.render('dashboard', {
            titulo: nombre ? `Resultados para "${nombre}"` : 'Dashboard de Superhéroes',
            superheroes,
            busqueda: nombre || ''  // ← guardamos lo que buscó para mostrarlo en el input
        });
    } catch (error) {
        console.error('Error en dashboard:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
};





// Mostrar formulario para AGREGAR
export const showAddFormController = (req, res) => {
    res.render('addSuperheroe', {
        titulo: 'Agregar Superhéroe',
        errores: null,
        datos: null
    });
};

// Mostrar formulario para EDITAR
export const showEditFormController = async (req, res) => {
    try {
        const { id } = req.params;
        const superheroe = await superheroeService.getSuperheroeById(id);
        res.render('editSuperheroe', {
            titulo: 'Editar Superhéroe',
            errores: null,
            heroe: superheroe
        });
    } catch (error) {
        console.error('Error en showEditForm:', error);
        res.status(404).send('Superhéroe no encontrado');
    }
};

// ==========================================
// ACCIONES (procesan datos y redirigen)
// ==========================================

// Crear superhéroe (POST) antes de express-validator
// export const createSuperheroeController = async (req, res) => {
//     try {
//         await superheroeService.createSuperheroe(req.body);
//         res.redirect('/heroes/dashboard');
//     } catch (error) {
//         console.error('Error en create:', error);
//         res.render('addSuperheroe', {
//             titulo: 'Agregar Superhéroe',
//             errores: [{ msg: error.message }],
//             datos: req.body
//         });
//     }
// };


// En superheroesController.mjs
export const createSuperheroeController = async (req, res) => {
    try {

        await superheroeService.createSuperheroe(req.body);

        res.redirect('/dashboard');

    } catch (error) {

        res.render('addSuperheroe', {
            titulo: 'Agregar Superhéroe',
            errores: [{ msg: error.message }],
            datos: req.body
        });

    }
};

// Actualizar superhéroe (PUT)
export const updateSuperheroeController = async (req, res) => {
    try {
        const { id } = req.params;
        await superheroeService.updateSuperheroe(id, req.body);


        
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error en update:', error);
        res.status(404).send('Error al actualizar: ' + error.message);
    }
};

// Eliminar superhéroe (DELETE)
export const deleteSuperheroeController = async (req, res) => {
    try {
        const { id } = req.params;
        await superheroeService.deleteSuperheroe(id);
        res.status(200).json({ message: 'Eliminado correctamente' });
    } catch (error) {
        console.error('Error en delete:', error);
        res.status(500).json({ error: error.message });
    }
};