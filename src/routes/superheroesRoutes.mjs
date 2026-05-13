import express from 'express';
import {
    dashboardController,
    showAddFormController,
    createSuperheroeController,
    showEditFormController,
    updateSuperheroeController,
    deleteSuperheroeController
} from '../controllers/superheroesController.mjs';
import { validateSuperheroe } from '../validations/superheroeValidations.mjs';  //  validacioens

const router = express.Router();

// ==========================================
// RUTAS DEL DASHBOARD
// ==========================================
router.get('/dashboard', dashboardController);

// ==========================================
// RUTAS PARA AGREGAR
// ==========================================
router.get('/agregar', showAddFormController);
// router.post('/agregar', createSuperheroeController);
router.post('/agregar', validateSuperheroe, createSuperheroeController);  // con validación
// ==========================================
// RUTAS PARA EDITAR
// ==========================================
router.get('/editar/:id', showEditFormController);
// router.put('/editar/:id', updateSuperheroeController);
router.put('/editar/:id', validateSuperheroe, updateSuperheroeController);  // ← validación

// ==========================================
// RUTAS PARA ELIMINAR
// ==========================================
router.delete('/eliminar/:id', deleteSuperheroeController);

// ==========================================
// REDIRECCIÓN PRINCIPAL
// ==========================================
router.get('/', (req, res) => {
    res.redirect('/api/heroes/dashboard');
});

export default router;