import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "PARKING_OWNER", "CLIENT"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
