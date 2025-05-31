import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, updateAvailability, updateProduct } from './handlers/product';
import { getProducts } from './handlers/product';
import { getProductById } from './handlers/product';
import { handleInputErrors } from './middleware/index';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The Product ID
 *            example: 1
 *          name:
 *            type: string 
 *            description: The Product name
 *            example: monitor Curvo de 49 Pulgadas
 *          price:
 *            type: number
 *            description: The Product price
 *            example: 300
 *          availability:
 *            type: boolean
 *            description: The Product availability
 *            example: true
 */

/**
 * @swagger
 * /api/products:
 *      get: 
 *          summary: Get a list of products 
 *          tags: 
 *                - Products
 *          description: Return a list of products
 *          responses:
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/jcon:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */


//Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get: 
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *         - in: path
 *          name: id
 *          description: The ID of the product to retrieve 
 *          required: true 
 *          schema:
 *              type: interger
 *      responses:
 *           200:
 *               description: Successeful Response
 *               content:
 *                  application/json:
 *                      chema:
 *                         $ref: '#/components/schemas/Product'
 *           404:
 *               description: Not found
 *           400:
 *               description: Bad Request - Invalid ID
 */

router.get('/:id',
  param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
  handleInputErrors,
  getProductById
)


/**
 * @swagger
 * /api/product:
 *   post:
 *        summary: Creates a new product 
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody:
 *        required: true 
 *        content: 
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                         name: 
 *                             type: string 
 *                             example: "Monitor Curvo 49 Pulgadas"
 *                         price: 
 *                              type: number 
 *                              example: 399
 *        responses:
 *            201: 
 *                description: Successful response
 *                content:
 *                   application/json:
 *                        schema:
 *                             $ref: '#/components/schemas/Product'
 *            400:
 *                 description: Bad Request - invalid input data
 */

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

/**
 * @swagger
 *  /api/products/{id}:
 *   put:
 *       summary: Updates a product with user input
 *       tags: 
 *           - Products
 *       description: Returns the updated product 
 *       parameters:
 *         - in: path
 *            name: id
 *            description: The ID of the product to retrieve 
 *            required: true 
 *            schema:
 *                type: interger
 *        requestBody:
 *        required: true 
 *        content: 
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                         name: 
 *                             type: string 
 *                             example: "Monitor Curvo 49 Pulgadas"
 *                         price: 
 *                              type: number 
 *                              example: 399
 *                         availability:
 *                              type: boolean
 *                              example: true 
 *        responses:
 *            200: 
 *                description: Successful response
 *                content:
 *                   application/json:
 *                        schema:
 *                             $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid ID or Invalid input data
 *            404:
 *                description : Product Not Found
 */

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

/**
 * @swagger
 *  /api/products/{id}:
 *    patch:
 *       summary: Update Product availability
 *       tags:
 *            - Products
 *       description: Returns the update availability
 *       parameters:
 *         - in: path
 *            name: id
 *            description: The ID of the product to retrieve 
 *            required: true 
 *            schema:
 *                type: interger
 *        responses:
 *            200: 
 *                description: Successful response
 *                content:
 *                   application/json:
 *                        schema:
 *                             $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid ID 
 *            404:
 *                description : Product Not Found
 */

router.patch('/:id',
  param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
    handleInputErrors,
  updateAvailability
)

/**
 * @swagger
 *  /api/products/{id}:
 *    delete:
 *       summary: Delete a product by a given D
 *       tags:
 *            - Products
 *       description: Returns a confirmation message
 *       parameters:
 *         - in: path
 *            name: id
 *            description: The ID of the product to delete 
 *            required: true 
 *            schema:
 *                type: interger
 *        responses:
 *            200: 
 *                description: Successful response
 *                content:
 *                   application/json:
 *                        schema:
 *                             type: string 
 *                             value: 'Producto Eliminado'
 *            400:
 *                description: Bad Request - Invalid ID 
 *            404:
 *                description : Product Not Found
 */

router.delete('/:id',   
  param('id')
    .isInt()
    .withMessage('El ID del Producto no valido'),
    handleInputErrors,
    deleteProduct
  )

export default router;
