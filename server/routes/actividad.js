
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, adminRole } = require('../middlewares');
const { crearActividad, agregarUsuarioActividad, obtenerActividades, obtenerActividad } = require('../controllers/actividad');


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
    check('nombre', 'El nombre es obligatoria').notEmpty(),
    validarCampos,
], crearActividad);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo').isMongoId(),
    validarCampos,
], agregarUsuarioActividad);




module.exports = router

