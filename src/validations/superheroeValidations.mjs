import { body, validationResult } from 'express-validator';

const prepararDatosParaVista = (data, id) => {
    const preparados = { ...data };
    
    if (id) {
        preparados._id = id;
    }
    
    if (preparados.poderes && typeof preparados.poderes === 'string') {
        preparados.poderes = preparados.poderes.split(',').map(p => p.trim());
    }
    if (preparados.aliados && typeof preparados.aliados === 'string') {
        preparados.aliados = preparados.aliados.split(',').map(a => a.trim());
    }
    if (preparados.enemigos && typeof preparados.enemigos === 'string') {
        preparados.enemigos = preparados.enemigos.split(',').map(e => e.trim());
    }
    
    return preparados;
};

// Validación para arrays (poderes, aliados, enemigos)
const validarArrayMinimo = (value, nombreCampo, min = 3) => {
    if (!value) return true; // Opcional
    
    const items = value.split(',').map(item => item.trim());
    for (const item of items) {
        if (item.length < min) {
            throw new Error(`Cada ${nombreCampo} debe tener al menos ${min} caracteres`);
        }
    }
    return true;
};

export const validateSuperheroe = [
    // Nombre del superhéroe
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .trim(),
    
    // Nombre real
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres')
        .trim(),
    
    // Edad
    body('edad')
        .notEmpty().withMessage('La edad es obligatoria')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número positivo'),
    
    // Planeta de origen
    body('planetaOrigen')
        .optional()
        .isLength({ min: 2 }).withMessage('El planeta de origen debe tener al menos 2 caracteres')
        .trim(),
    
    // ==========================================
    // DEBILIDAD (NUEVA)
    // ==========================================
    body('debilidad')
         .optional({ checkFalsy: true })  // ← clave: trata "" como vacío
        .isLength({ min: 3 }).withMessage('La debilidad debe tener al menos 3 caracteres')
        .trim(),
    
    // ==========================================
    // PODERES (cada uno mínimo 3 caracteres)
    // ==========================================
    body('poderes')
        .optional()
        .custom((value) => validarArrayMinimo(value, 'poder', 3)),
    
    // ==========================================
    // ALIADOS (cada uno mínimo 3 caracteres)
    // ==========================================
    body('aliados')
        .optional()
        .custom((value) => validarArrayMinimo(value, 'aliado', 3)),
    
    // ==========================================
    // ENEMIGOS (cada uno mínimo 3 caracteres)
    // ==========================================
    body('enemigos')
        .optional()
        .custom((value) => validarArrayMinimo(value, 'enemigo', 3)),
    
    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const isEditing = req.originalUrl.includes('editar');
            const id = req.params.id;
            
            if (isEditing) {
                const heroePreparado = prepararDatosParaVista(req.body, id);
                
                return res.render('editSuperheroe', {
                    titulo: 'Editar Superhéroe',
                    errores: errors.array(),
                    heroe: heroePreparado
                });
            } else {
                return res.render('addSuperheroe', {
                    titulo: 'Agregar Superhéroe',
                    errores: errors.array(),
                    datos: req.body
                });
            }
        }
        
        next();
    }
];