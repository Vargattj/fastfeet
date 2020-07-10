import Sequelize from "sequelize";

import User from "../app/models/User";
import Recipient from "../app/models/Recipient";
import File from "../app/models/File";
import databaseConfig from "../config/database";
import Delivery from "../app/models/Delivery";

const models = [User, Recipient, Delivery, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
