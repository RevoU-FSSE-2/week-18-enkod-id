const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('createTransactions'),
    validate(transactionValidation.createTransaction),
    transactionController.createTransaction
  )
  .get(auth('getTransactions'), validate(transactionValidation.getTransactions), transactionController.getTransactions);

router
  .route('/:transactionId')
  .get(auth('getTransactions'), validate(transactionValidation.getTransaction), transactionController.getTransaction)
  .patch(
    auth('manageTransactions'),
    validate(transactionValidation.updateTransaction),
    transactionController.updateTransaction
  )
  .delete(
    auth('manageTransactions'),
    validate(transactionValidation.deleteTransaction),
    transactionController.deleteTransaction
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management and retrieval
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     description: Only authorized users can create transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idTransaction
 *               - idUser
 *               - idStore
 *               - products
 *               - transactionDate
 *             properties:
 *               idTransaction:
 *                 type: string
 *               idUser:
 *                 type: string
 *               idStore:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - idProduct
 *                     - category
 *                     - title
 *                     - price
 *                     - qty
 *                     - subtotal
 *                   properties:
 *                     idProduct:
 *                       type: string
 *                     category:
 *                       type: string
 *                     title:
 *                       type: string
 *                     price:
 *                       type: string
 *                     qty:
 *                       type: number
 *                     subtotal:
 *                       type: number
 *                 example:
 *                   - idProduct: "product123"
 *                     category: "Electronics"
 *                     title: "Smartphone"
 *                     price: "500.00"
 *                     qty: 2
 *                     subtotal: 1000.00
 *               transactionDate:
 *                 type: string
 *                 format: date-time
 *             example:
 *               idTransaction: "123456"
 *               idUser: "user123"
 *               idStore: "store123"
 *               products:
 *                 - idProduct: "product123"
 *                   category: "Electronics"
 *                   title: "Smartphone"
 *                   price: "500.00"
 *                   qty: 2
 *                   subtotal: 1000.00
 *               transactionDate: "2023-12-31T23:59:59.999Z"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all transactions
 *     description: Only authorized users can retrieve all transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: idStore
 *         schema:
 *           type: string
 *         description: Store id
 *       - in: query
 *         name: idProduct
 *         schema:
 *           type: string
 *         description: Product id
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Transaction category
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Transaction title
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: Transaction price
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Transaction quantity
 *       - in: query
 *         name: subtotal
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Transaction subtotal
 *       - in: query
 *         name: transactionDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Transaction date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. transactionDate:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of transactions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction
 *     description: Only authorized users can fetch their own transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a transaction
 *     description: Only authorized users can update their own transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *               idStore:
 *                 type: string
 *               idProduct:
 *                 type: string
 *               category:
 *                 type: string
 *               title:
 *                 type: string
 *               price:
 *                 type: string
 *               qty:
 *                 type: number
 *               subtotal:
 *                 type: number
 *               transactionDate:
 *                 type: string
 *                 format: date-time
 *             example:
 *               idUser: "user123"
 *               idStore: "store123"
 *               idProduct: "product123"
 *               category: "Electronics"
 *               title: "Smartphone"
 *               price: "500.00"
 *               qty: 2
 *               subtotal: 1000.00
 *               transactionDate: "2023-12-31T23:59:59.999Z"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a transaction
 *     description: Only authorized users can delete their own transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
