class ProductsRoute {
  constructor(dependencies) {
    /* Base Properties */
    this._dependencies = dependencies;
    this._utilities = this._dependencies.utilities;
    this._console = this._dependencies.console;
    this._services = this._dependencies.services;

    this.EntityService = this._services.ProductsService;
  }

  /**
   * @swagger
   * /products/{queryselector}:
   *   get:
   *     summary: Get an products by query selector.
   *     description: Returns the products information that matches the query selector an search specified in the route.
   *     tags:
   *       - products
   *     parameters:
   *       - in: path
   *         name: queryselector
   *         description: Is the filter available for this query
   *         required: true
   *         schema:
   *           enum:
   *              - id
   *              - all
   *       - in: query
   *         name: search
   *         description: Keyword to search for entities.
   *         required: false
   *         schema:
   *           type: string
   *         example: 50
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/products'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async get({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);

      return entityService.get(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  /**
   * @swagger
   * /products/:
   *   post:
   *      summary: Create a new products.
   *      description: Returns the created products with data provided.
   *      tags:
   *       - products
   *      requestBody:
   *        description: products object to be created.
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/products'
   *      responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/products'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async create({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);

      return entityService.create(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  /**
   * @swagger
   * /products/:
   *   patch:
   *      summary: Update an existing products.
   *      description: Updates the data of an existing products with the data provided.
   *      tags:
   *       - products
   *      requestBody:
   *        description: products object to be created.
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/products'
   *      responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/products'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async update({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);

      return entityService.update(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  /**
   * @swagger
   * /products/:
   *   delete:
   *     summary: Delete a products by its id.
   *     description: Deletes a products based on the provided ID.
   *     tags:
   *       - products
   *     requestBody:
   *       description: ID of the products to delete
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *             example:
   *               id: ""
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: products successfully deleted
   *                   result: null
   *       500:
   *         description: Something went wrong while performing this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Error:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something went wrong while performing this action
   *                   result: null
   */
  async delete({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);
      return entityService.delete(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }
}

module.exports = ProductsRoute;
