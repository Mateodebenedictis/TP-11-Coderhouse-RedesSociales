const { Router } = require('express')
const ApiProductosMock = require('../api/productos')


const apiProductos = new ApiProductosMock();
const router = Router();

router.get('/productos-test', async (req, res, next) => {
    try {
        res.json(await apiProductos.popular(5));
    } catch (error) {
        next(error);
    }
});


router.use((err, req, res, next) => {

    const erroresNoEncontrado = [
        "Error al listar: elemento no encontrado",
        "Error al actualizar: elemento no encontrado",
        "Error al borrar: elemento no encontrado",
    ];

    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404);
    } else {
        res.status(500);
    }
    res.json({ message: err.message });
});


module.exports = router;






