
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, adminRole } = require('../middlewares');



const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener ima categoria por id- publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
obtenerCategoria);

// crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    adminRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
],
actualizarCategoria);

// borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);

module.exports = router

