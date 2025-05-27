import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class GallaAmount extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        gallaUserId: Sequelize.INTEGER,
        galladate: Sequelize.STRING,
        createdBy: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true, //If it's false do not add the attributes (updatedAt, createdAt).
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'galla_amount' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.GallaUser, {
      through: "GallaUser",
      foreignKey: "gallaUserId",
    });
  }
}

export default GallaAmount;
