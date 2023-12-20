class UserApiRoute {
    constructor(dependencies) {
      /* Base Properties */
      this._dependencies = dependencies;
      this._utilities = this._dependencies.utilities;
      this._console = this._dependencies.console;
      this._services = this._dependencies.services;
  
      this.EntityService = this._services.UsersApiService;
    }
  
    /**
     * @swagger
     * /user/{queryselector}:
     *   get:
     *     summary: Get an user by query selector.
     *     description: Returns the user information that matches the query selector an search specified in the route.
     *     tags:
     *       - user
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
     *                     $ref: '#/components/schemas/user'
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
  
  }
  
  module.exports = UserApiRoute;
  