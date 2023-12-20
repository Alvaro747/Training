class MongoDBDataSource {
  constructor(dependencies) {
    if (!dependencies) {
      throw new Error('Required args to build this entity');
    }

    /* Base Properties */
    this._dependencies = dependencies;
    this._console = this._dependencies.console;
    this._utilities = this._dependencies.utilities;
    this._db = this._dependencies.db;

    /* Custom Properties */
    this._dataSourceConfig =
      this._dependencies.config.DATASOURCE_CONFIGS.MONGODB;
    this._databaseConnectionObj = this._dataSourceConfig.CONNECTION_OBJ || {};
    this._databaseSettings = this._dataSourceConfig.SETTINGS || {};
  }

  async setup() {
    try {
      // Setup the driver/client
      const settings = this._databaseSettings;
      settings.serverApi = this._db.driver.ServerApiVersion.v1;

      // Create a client and create a new connection
      this.mongoClient = new this._db.driver.MongoClient(
        this._databaseConnectionObj,
        settings,
      );
      this._db.client = await this.mongoClient.connect();
    } catch (error) {
      this._console.error(error);
    }
  }

  async create({ tableName, entity } = {}) {
    try {
      const collection = this._db.client
        .db(this._databaseSettings.dbName)
        .collection(tableName);
      const documentResponse = collection.insertOne(entity);

      if (!documentResponse) {
        this._utilities.io.response.error();
      }

      return documentResponse || {};
    } catch (error) {
      this._console.error(error);

      return null;
    }
  }

  async update({ tableName, entity } = {}) {
    try {
      const query = { id: entity.id };
      const contract = { $set: entity };
      const collection = this._db.client
        .db(this._databaseSettings.dbName)
        .collection(tableName);

      const documentResponse = await collection.updateOne(query, contract);

      return documentResponse || {};
    } catch (error) {
      this._console.error(error);

      return null;
    }
  }

  async delete({ tableName, id } = {}) {
    try {
      const query = { id }; // Assuming 'id' is the field to identify the document
      const collection = this._db.client
        .db(this._databaseSettings.dbName)
        .collection(tableName);

      const documentResponse = await collection.deleteOne(query);

      return documentResponse || {};
    } catch (error) {
      this._console.error(error);

      return null;
    }
  }

  async findById({ tableName, id } = {}) {
    try {
      const query = { id };
      const collection = this._db.client
        .db(this._databaseSettings.dbName)
        .collection(tableName);

      const document = await collection.findOne(query);

      return document || null;
    } catch (error) {
      this._console.error(error);

      return null;
    }
  }

  async getAll({ tableName } = {}) {
    try {
      const collection = this._db.client
        .db(this._databaseSettings.dbName)
        .collection(tableName);

      const documents = await collection.find().toArray();

      return documents || [];
    } catch (error) {
      this._console.error(error);

      return [];
    }
  }
}

module.exports = MongoDBDataSource;
