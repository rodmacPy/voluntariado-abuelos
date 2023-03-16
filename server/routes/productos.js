
const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/Productos');
const { existeProductoPorId, existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, adminRole } = require('../middlewares');



const router = Router();

// Obtener todas las Productos - publico
router.get('/', obtenerProductos);

// Obtener ima Producto por id- publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );

// crear Producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],
actualizarProducto);

// borrar una Producto - Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto);

module.exports = router

