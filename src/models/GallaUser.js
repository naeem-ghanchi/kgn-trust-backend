import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class GallaUser extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        pincode: Sequelize.STRING,
        mobile: Sequelize.STRING,
        createdBy: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true, //If it's false do not add the attributes (updatedAt, createdAt).
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'galla_users' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      through: "User",
      foreignKey: "createdBy",
    });
  }
}

export default GallaUser;
