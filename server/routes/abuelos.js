
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares');
const { crearAbuelo } = require('../controllers/abuelos');


const router = Router();

router.post('/', [
    validarJWT,
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').notEmpty(),
    check('genero', 'El género es obligatorio').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('ciudad', 'La ciudad es obligatoria').notEmpty(),
    validarCampos,
], crearAbuelo);


module.exports = router

