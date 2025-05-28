import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct } from './handlers/product';
import { getProducts } from './handlers/product';
import { getProductById } from './handlers/product';
import { handleInputErrors } from './middleware/index';

const router = Router();

router.get('/', getProducts)
router.get('/:id', 
    param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
    handleInputErrors,
    getProductById
  )

router.post('/',
  // Validar los datos del producto
  body('name')
    .notEmpty()
    .withMessage('El nombre del Producto no puede estar vacío'),

  body('price')
    .notEmpty()
    .withMessage('El precio del Producto no puede estar vacío')
    .bail()
    .isNumeric()
    .withMessage('El precio del Producto debe ser un número')
    .bail()
    .custom(value => Number(value) > 0)
    .withMessage('El precio debe ser mayor a 0'),
  handleInputErrors,
  createProduct
)

router.put('/', (req, res) => {
  res.json({ message: 'Hello, put!' });
})

router.patch('/', (req, res) => {
  res.json({ message: 'Hello, patch!' });
})

router.delete('/', (req, res) => {
  res.json({ message: 'Hello, delete!' });
})

export default router;
