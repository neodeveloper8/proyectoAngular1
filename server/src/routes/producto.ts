import { Router} from 'express';
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from '../controllers/producto';
import { verifyToken } from '../middleware/auth';


const router = Router();
router.get('/', getProducts),
router.get('/:id', getProduct),
router.delete('/:id', deleteProduct)
router.post('/', postProduct)
router.put('/:id',updateProduct);

// router.get('/', verifyToken, getProducts); // Ruta protegida
// router.get('/:id', verifyToken, getProduct); // Ruta protegida
// router.delete('/:id', verifyToken, deleteProduct); // Ruta protegida
// router.post('/', verifyToken, postProduct); // Ruta protegida
// router.put('/:id', verifyToken, updateProduct); // Ruta protegida

export default router;