//Las rutas son el mapa de navegación de la aplicación. Le dicen a Express: "Cuando llegue una petición con esta URL y este método HTTP, ejecutá tal función del controlador".
//Define qué URLs reconoce el servidor y qué controlador se encarga de cada una.

import express from 'express';
import {
    dashboardController,
    showAddFormController,
    createSuperheroeController,   
    showEditFormController,
    updateSuperheroeController,
    deleteSuperheroeController
} from '../controllers/superheroesController.mjs';

import { validateSuperheroe } from '../validations/superheroeValidations.mjs';

const router = express.Router();// la parte de express que nos interes , no todo express

// Dashboard
router.get('/', dashboardController);

// Agregar
router.get('/agregar', showAddFormController);
router.post('/agregar', validateSuperheroe, createSuperheroeController);

// Editar
router.get('/editar/:id', showEditFormController);

router.put('/editar/:id', validateSuperheroe, updateSuperheroeController);

// Eliminar (desde form o fetch)
router.post('/eliminar/:id', deleteSuperheroeController);

export default router;