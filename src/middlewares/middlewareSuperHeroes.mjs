import express from 'express';
const router = express.Router();

import { body, validationResult } from 'express-validator';
export const validateSuperHeroe = [
    body("nombreSuperHeroe")
        .trim() //validar que no tenga espacios en blanco
        .notEmpty().withMessage("El Nombre de superheroe es requerido")
        .isLength({ min: 3 }).withMessage("El nombre del superheroe debe tener al menos 3 caracteres")//isLenght permite validar longitud mínima y/o maxima
        .isLength({ max: 60 }).withMessage("El nombre del superheroe no puede superar los 60 caracteres "),//isLenght permite validar longitud mínima y/o maxima

    body("nombreReal")
        .trim() //validar que no tenga espacios en blanco
        .notEmpty().withMessage("Nombre Real del superheroe es requerido")
        .isLength({ min: 3, max: 60 }).withMessage("El nombre debe tener al menos 3 caracteres y no mas de 60 caracteres"),//isLenght permite validar longitud mínima y/o maxima

    body("edad")
        .trim() // Elimina espacios en blanco al inicio y final
        .notEmpty().withMessage("El campo edad es requerido") // No esté vacío
        .isNumeric().withMessage("La edad debe ser un valor numérico") // Es numérico
        .isInt({ min: 0 }).withMessage("La edad debe ser un número entero mayor o igual a 0"),
    //body ("poderes,*") se refiere a cada elemento del array "poderes", es una forma de validar cada poder individualmente.
    body("poderes")
        .isArray({ min: 1 }).withMessage("El campo poderes debe ser un array con al menos un elemento"),
    //valido cada elemento del array poderes
    body("poderes.*")
        .isString().withMessage("Cada poder debe ser un string")
        .trim()//elimina espacios en blanco
        .isLength({ min: 3 }).withMessage("cada poder debe tener al menos 3 caracteres")
        .isLength({ max: 60 }).withMessage("cada poder no puede superar los 6o caracteres"),
    //Este es el middleware final que revisa si hubo errores de validación. Si los hay, responde con un 400,
    //y los detalles de los errores. Si no , llama a next() para continuar al controlador
    (req, res, next) => {
        //La libreria validationResult(req) recoge los resultados de las validaciones anteriores
        const errors = validationResult(req);
        //Si no esta vacio significa que hubo errores de validación
        if (!errors.isEmpty()) {
            //Si hay errores respondemos con un status 400 y un JSON que contiene los detalles de los errores
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();       
    },
];

export default router;
