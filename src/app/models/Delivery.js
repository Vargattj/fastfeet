import Sequelize, { Model, Sequelize } from "sequelize";

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "avatar_id", as: 'avatar' });
  }
}

export default Delivery;
