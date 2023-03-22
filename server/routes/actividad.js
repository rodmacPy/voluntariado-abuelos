
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, adminRole, validarArchivoSubir } = require('../middlewares');
const { crearActividad, agregarUsuarioActividad, obtenerActividades, obtenerActividad, borrarActividad, actualizarActividad } = require('../controllers/actividad');
const { existeActividadPorId } = require('../helpers');


const router = Router();
// Obtener todas las Productos - publico

//Obtener todas las Actividades - Publico
router.get('/', obtenerActividades);

//Obtener la Actividad por id - Publico
router.get('/:id', [
    check('id', 'No es un id de Mongo').isMongoId()
], obtenerActividad);

//Crear la Actividad - Privado = Requiere Token
router.post('/', [
    validarJWT,
    validarArchivoSubir,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos,
], crearActividad);

router.put('/unirse/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo').isMongoId(),
    validarCampos,
], agregarUsuarioActividad);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo').isMongoId(),
    validarCampos,
], actualizarActividad);



// borrar una Abuelo - Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeActividadPorId),
    validarCampos
],borrarActividad);

module.exports = router

