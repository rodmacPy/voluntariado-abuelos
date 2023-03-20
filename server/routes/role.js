
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, adminRole, validarCampos } = require('../middlewares');
const { crearRole } = require('../controllers/role');


const router = Router();

router.post('/', [
    validarJWT,
    adminRole,
    check('rol', 'El Role es obligatorio').notEmpty(),
    validarCampos,
], crearRole);


module.exports = router

