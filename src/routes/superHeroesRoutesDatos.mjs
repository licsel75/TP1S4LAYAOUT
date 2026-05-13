import express from 'express';

import {
    createSuperheroeController,
    updateSuperheroeController,
    deleteSuperheroeController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// Crear
router.post('/crear/heroes', createSuperheroeController);

// Actualizar
router.put('/editar/:id', updateSuperheroeController);

// Eliminar

router.delete('/eliminar/:id', deleteSuperheroeController);

export default router;