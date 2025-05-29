import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, updateAvailability, updateProduct } from './handlers/product';
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

router.put('/:id',
  param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
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
  body('availability')
    .isBoolean()
    .withMessage('La disponibilidad del Producto debe ser un booleano'),
  handleInputErrors,
  updateProduct
)

router.patch('/:id',
  param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
    handleInputErrors,
  updateAvailability
)

router.delete('/:id',   
  param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
    handleInputErrors,
    deleteProduct
  )

export default router;
