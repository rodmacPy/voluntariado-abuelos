
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, adminRole } = require('../middlewares');
const { crearActividad } = require('../controllers/actividades');


const router = Router();
// Obtener todas las Productos - publico



router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatoria').notEmpty(),
    validarCampos,
], crearActividad);




module.exports = router

