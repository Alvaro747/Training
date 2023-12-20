class ServerManager {
  constructor(args) {
    /* Base Properties */
    this._args = args;
    this._dependenciesManager = {};

    /* Assigments */
    this._utilitiesManager = {};
    this._settingsManager = {};
    this._consoleManager = {};
    this._eventBusManager = {};
    this._modelsManager = {};
    this._dalManager = {};
    this._authManager = {};
    this._databaseManager = {};
    this._pushManager = {};
    this._serviceManager = {};
    this._apiManager = {};
    this._functionsManager = {};
    this._eventBrokerManager = {};
    this._eventBrokerManager = {};
    this._namespace = '[Server]::[Manager]';
  }

  async load() {
    try {
      console.log(` ${this._namespace}: Loading`);

      this.#setupDependencies();

      this.#setupConsole();

      this.#setupSettings();

      this.#setupDataTypes();

      await this.#setupDatabase();

      this.#setupModels();

      this.#setupServices();
      this.#setupApi();

      this.#setupServer();

      this._dependenciesManager.core
        .get()
        .console.success('Loaded', { namespace: this._namespace });

      return this._dependenciesManager.core.get();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }

  #setupDependencies() {
    const { DependenciesManager } = require('./dependencies.manager');
    this._dependenciesManager = new DependenciesManager(this._args);
    this._dependenciesManager.setup();

    this._dependenciesManager.core.add(
      this._dependenciesManager,
      'DependenciesManager',
    );
  }

  #setupSettings() {
    const { SettingsManager } = require('./settings.manager');
    this._settingsManager = new SettingsManager(
      this._dependenciesManager.core.get(),
    );
    this._settingsManager.setup();

    this._dependenciesManager.core.add(
      this._settingsManager,
      'SettingsManager',
    );
  }

  #setupConsole() {
    const { ConsoleManager } = require('./console.manager');
    this._consoleManager = new ConsoleManager(
      this._dependenciesManager.core.get(),
    );
    this._consoleManager.setup();

    this._dependenciesManager.core.add(this._consoleManager, 'console');
  }

  #setupModels() {
    const { ModelManager } = require('./model.manager');
    this._modelsManager = new ModelManager(
      this._dependenciesManager.core.get(),
    );
    this._modelsManager.setup();

    this._dependenciesManager.core.add(this._modelsManager, 'ModelsManager');
    this._dependenciesManager.core.add(this._modelsManager.models, 'models');
  }

  async #setupDataTypes() {
    const { DataTypesManager } = require('./data-types.manager');
    this._dalManager = new DataTypesManager(
      this._dependenciesManager.core.get(),
    );
    this._dalManager.setup();

    this._dependenciesManager.core.add(this._dalManager, 'DataTypesManager');
  }

  #setupDatabase() {
    const { DatabaseManager } = require('./database.manager');
    this._databaseManager = new DatabaseManager({
      dependencies: this._dependenciesManager.core.get(),
      dependencyInjector: this._dependenciesManager,
    });
    this._databaseManager.setup();

    this._dependenciesManager.core.add(
      this._databaseManager,
      'DatabaseManager',
    );

    return this._databaseManager;
  }

  #setupServices() {
    const { ServiceManager } = require('./service.manager');
    this._serviceManager = new ServiceManager(
      this._dependenciesManager.core.get(),
    );
    this._serviceManager.setup();

    this._dependenciesManager.core.add(this._serviceManager, 'ServiceManager');
    this._dependenciesManager.core.add(
      this._serviceManager.services,
      'services',
    );
  }

  #setupApi() {
    const { ApiManager } = require('./api.manager');
    this._apiManager = new ApiManager(this._dependenciesManager.core.get());
    this._apiManager.setup();

    this._dependenciesManager.core.add(this._apiManager, 'ApiManager');
  }

  
  #setupServer() {
    this._settingsManager.listenServer();
  }

  get settings() {
    return this._settingsManager;
  }
}

module.exports = { ServerManager };
