
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, adminRole } = require('../middlewares');
const { crearAbuelo, obtenerAbuelos, actualizarAbuelo, borrarAbuelo } = require('../controllers/abuelos');
const { existeAbueloPorId, esRoleValido } = require('../helpers');


const router = Router();
// Obtener todas las Productos - publico
router.get('/', obtenerAbuelos);


router.post('/', [
    validarJWT,
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').notEmpty(),
    check('genero', 'El género es obligatorio').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('ciudad', 'La ciudad es obligatoria').notEmpty(),
    validarCampos,
], crearAbuelo);


router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeAbueloPorId),
    validarCampos,
],
actualizarAbuelo);

// borrar una Abuelo - Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeAbueloPorId),
    validarCampos
],borrarAbuelo);


module.exports = router

