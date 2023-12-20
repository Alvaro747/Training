/**
 * @swagger
 * components:
 *   schemas:
 *     products:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: this is the auto generated id of the product
 *        name:
 *          type: string
 *          description: this is the name of the product
 *        description:
 *          type: string
 *          description: this is the description of the product
 *        price:
 *          type: number
 *          description: this is the price of the product
 *        quantity:
 *          type: number
 *          description: this is the quantity of the product
 *      example:
 *        id: ""
 *        name: "product 1"
 *        description: "product 1 description"
 *        price: 100
 *        quantity: 100
 */
class ProductsModel {
  constructor(args, dependencies) {
    if (!args || !dependencies) {
      throw new Error('Required args and dependencies to build this entity');
    }

    /* Base Properties */
    this._dependencies = dependencies;
    this._utilities = this._dependencies.utilities;
    this._dataTypesManager = this._dependencies.DataTypesManager;

    /* Custom Properties */
    this._types = this._dataTypesManager.types;

    /* Base Properties */

    this.id = { value: args.id, type: this._types.bigserial, isPK: true };

    /* Custom fields */
    this.name = { value: args.name, type: this._types.string };
    this.description = { value: args.description, type: this._types.string };
    this.price = { value: args.price, type: this._types.number };
    this.quantity = { value: args.quantity, type: this._types.number };
  }

  // Return entity sanitized
  get sanitized() {
    return {
      id: this.id.value || this.id.type.default,
      name: this.name.value || this.name.type.default,
      description: this.description.value || this.description.type.default,
      price: this.price.value || this.price.type.default,
      quantity: this.quantity.value || this.quantity.type.default,
    };
  }

  get get() {
    return {
      id: this.id.value || this.id.type.default,
      name: this.name.value || this.name.type.default,
      description: this.description.value || this.description.type.default,
      price: this.price.value || this.price.type.default,
      quantity: this.quantity.value || this.quantity.type.default,
    };
  }
}

module.exports = ProductsModel;
