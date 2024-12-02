"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const router = (0, express_1.Router)();
router.get('/', producto_1.getProducts),
    router.get('/:id', producto_1.getProduct),
    router.delete('/:id', producto_1.deleteProduct);
router.post('/', producto_1.postProduct);
router.put('/:id', producto_1.updateProduct);
// router.get('/', verifyToken, getProducts); // Ruta protegida
// router.get('/:id', verifyToken, getProduct); // Ruta protegida
// router.delete('/:id', verifyToken, deleteProduct); // Ruta protegida
// router.post('/', verifyToken, postProduct); // Ruta protegida
// router.put('/:id', verifyToken, updateProduct); // Ruta protegida
exports.default = router;
