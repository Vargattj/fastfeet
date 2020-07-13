import Sequelize, { Model, Sequelize } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.BOOLEAN,
        start_date: Sequelize.STRING,
        end_date: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "signature_id", as: 'signature' });
  }
}

export default Order;
